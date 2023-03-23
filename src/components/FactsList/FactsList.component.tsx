import { useState, useEffect, useMemo } from 'react'
import { Table } from 'antd'

import { getColumns } from './FactsList.helper'
import { Modal } from '../Modal'
import { useRequest } from '../../hooks/useRequest'
import { FactsListType } from './FactsList.types'
import { FlexBox, Container, Heading } from './FactsList.styles'

export const FactsList: React.FC = () => {
  const [detailsId, setDetailsId] = useState('')
  const { loading, data, fetchData } = useRequest<FactsListType[]>(
    () => fetch('https://cat-fact.herokuapp.com/facts?animal_type=cat'),
    'facts',
  )

  const onDetailsClick = (id: string) => setDetailsId(id)

  const columns = useMemo(() => getColumns(onDetailsClick), [])

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
