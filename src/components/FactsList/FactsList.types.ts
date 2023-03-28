import type { InputRef } from 'antd'
import type { FilterConfirmProps } from 'antd/es/table/interface'

export interface FactsListType {
  text: string
  _id: string
}

export type FactsListIndex = keyof FactsListType

export type GetColumnsProps = {
  onDetailsClick: (id: string) => void
} & Omit<GetColumnSearchProps, 'dataIndex'>

export interface GetColumnSearchProps {
  dataIndex: FactsListIndex
  searchInput: React.RefObject<InputRef>
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  setSearchedColumn: React.Dispatch<React.SetStateAction<string>>
  handleSearch: (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: FactsListIndex,
  ) => void
  handleReset: (clearFilters: () => void) => void
  searchText: string
  searchedColumn: string
}
