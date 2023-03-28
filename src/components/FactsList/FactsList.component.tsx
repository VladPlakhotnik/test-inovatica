import { useState, useEffect, useMemo, useRef } from 'react'
import { Table } from 'antd'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import type { InputRef } from 'antd'

import { getColumns } from './FactsList.helper'
import { Modal } from '../Modal'
import { useRequest } from '../../hooks/useRequest'
import { FactsListType, FactsListIndex } from './FactsList.types'
import { FlexBox, Container, Heading } from './FactsList.styles'

export const FactsList: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const [detailsId, setDetailsId] = useState('')

  const { loading, data, fetchData } = useRequest<FactsListType[]>(
    () => fetch('https://cat-fact.herokuapp.com/facts?animal_type=cat'),
    'facts',
  )

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: FactsListIndex,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const onDetailsClick = (id: string) => setDetailsId(id)

  const columns = useMemo(
    () =>
      getColumns({
        onDetailsClick,
        searchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn,
        handleSearch,
        handleReset,
      }),
    [searchText, searchedColumn, searchInput],
  )

  const onClose = () => setDetailsId('')

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <FlexBox>
      <Container>
        <Heading>Recruitment task | Table of data retrieved from API</Heading>

        <Table bordered loading={loading} dataSource={data} columns={columns} />
        <Modal id={detailsId} onClose={onClose} />
      </Container>
    </FlexBox>
  )
}
