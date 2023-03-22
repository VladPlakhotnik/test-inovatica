import { useState, useEffect } from 'react'
import { FactsListType } from './FactsList.types'
import { Table } from 'antd'
import { FlexBox, Container, H1 } from './FactsList.styles'
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
  const [loading, setLoading] = useState(false)
  const [facts, setFacts] = useState<FactsListType[]>([])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://cat-fact.herokuapp.com/facts')
      const json = await response.json()
      setFacts(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <FlexBox>
      <Container>
        <H1>Recruitment task | Table of data retrieved from API</H1>
        <Table
          bordered
          loading={loading}
          dataSource={facts}
          columns={columns}
        />
      </Container>
    </FlexBox>
  )
}
