import styled from 'styled-components'

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  .ant-table {
    border-radius: 0;
  }
  .ant-pagination-item-link {
    color: #fff !important;
  }
  .ant-pagination-item-active {
    border-color: #fff !important;
  }
  .ant-pagination-item-ellipsis {
    color: #fff;
  }
  .ant-pagination-item-active a {
    color: #000 !important;
  }
  .ant-pagination-item a {
    color: #fff;
  }
  .ant-pagination-item-ellipsis {
    color: #fff !important;
  }
  .ant-pagination-item-link-icon {
    color: #fff !important;
  }
`
export const Heading = styled.h1`
  text-align: center;
  margin-bottom: 4rem;
`
