import { useEffect, useCallback } from 'react'
import { Table } from 'antd'

import { useRequest } from '../../hooks/useRequest'
import { FactsListType } from './FactsList.types'
import { FlexBox, Container, Heading } from './FactsList.styles'
import { Modal } from '../Modal'

const columns = [
  {
    title: 'Facts',
    dataIndex: 'text',
    key: 'text',
    sorter: (a: FactsListType, b: FactsListType) =>
      a.text.localeCompare(b.text),
  },
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Details',
    dataIndex: '_id',
    key: 'details',
    render: (id: string) => <Modal id={id} />,
  },
]

export const FactsList: React.FC = () => {
  const fetchRequest = useCallback(
    () => fetch('https://cat-fact.herokuapp.com/facts'),
    [],
  )
  const { loading, data, fetchData } = useRequest<FactsListType[]>(fetchRequest)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <FlexBox>
      <Container>
        <Heading>Recruitment task | Table of data retrieved from API</Heading>
        <Table bordered loading={loading} dataSource={data} columns={columns} />
      </Container>
    </FlexBox>
  )
}
