import { Button } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
  overflow: auto;
`
export const Pagination = styled.div`
  background-color: white;
  padding-bottom: 20px;
  border-radius: 0 0 10px 10px;
  margin-bottom: 30px;
  .ant-pagination {
    background-color: white;
  }
`

export const DateButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;

  svg {
    width: 12px !important;
    height: 12px !important;
    margin-right: 10px;
  }
`
