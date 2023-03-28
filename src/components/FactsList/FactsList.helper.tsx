import { Button, Input, Space } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'

import {
  FactsListType,
  GetColumnsProps,
  GetColumnSearchProps,
} from './FactsList.types'

export const getColumns = ({
  onDetailsClick,
  filteredInfo,
  ...searchProps
}: GetColumnsProps): ColumnsType<FactsListType> => [
  {
    title: 'Facts',
    dataIndex: 'text',
    key: 'text',
    sorter: (a: FactsListType, b: FactsListType) =>
      a.text.localeCompare(b.text),
    filteredValue: filteredInfo.text || null,
    onFilter: (value: string | number | boolean, record) =>
      record.text.includes(value as string),
    ...getColumnSearch({ dataIndex: 'text', ...searchProps }),
    ellipsis: true,
  },
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
    ellipsis: true,
  },
  {
    title: 'Types',
    dataIndex: 'type',
    key: 'type',
    filters: [
      { text: 'cat', value: 'cat' },
      { text: 'dog', value: 'dog' },
      { text: 'horse', value: 'horse' },
    ],
    filteredValue: filteredInfo.type || null,
    onFilter: (value: string | number | boolean, record) =>
      record.type.includes(value as string),
  },
  {
    title: 'Details',
    dataIndex: '_id',
    key: 'details',
    render: (id: string) => (
      <Button onClick={() => onDetailsClick(id)}>More Details</Button>
    ),
    ellipsis: true,
  },
]

export const getColumnSearch = ({
  dataIndex,
  searchInput,
  setSearchText,
  setSearchedColumn,
  handleSearch,
  handleReset,
  searchText,
  searchedColumn,
}: GetColumnSearchProps): ColumnType<FactsListType> => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
  }) => (
    <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() =>
          handleSearch(selectedKeys as string[], confirm, dataIndex)
        }
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type='primary'
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type='link'
          size='small'
          onClick={() => {
            confirm({ closeDropdown: false })
            setSearchText((selectedKeys as string[])[0])
            setSearchedColumn(dataIndex)
          }}
        >
          Filter
        </Button>
        <Button
          type='link'
          size='small'
          onClick={() => {
            close()
          }}
        >
          close
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1677ff' : '#000' }} />
  ),
  onFilterDropdownOpenChange: visible => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100)
    }
  },
  render: text =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
})
