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
  ...searchProps
}: GetColumnsProps): ColumnsType<FactsListType> => [
  {
    title: 'Facts',
    dataIndex: 'text',
    key: 'text',
    sorter: (a: FactsListType, b: FactsListType) =>
      a.text.localeCompare(b.text),
    ...getColumnSearch({ dataIndex: 'text', ...searchProps }),
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
    <SearchOutlined style={{ color: filtered ? '#000' : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
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
