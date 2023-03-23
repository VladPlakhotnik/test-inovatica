import { Button } from 'antd'

import { FactsListType } from './FactsList.types'

export const getColumns = (onDetailsClick: (id: string) => void) => [
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
    render: (id: string) => (
      <Button onClick={() => onDetailsClick(id)}>More Details</Button>
    ),
  },
]
