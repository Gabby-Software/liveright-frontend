import { Button } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
  overflow: auto;
`
export const Pagination = styled.div`
  background-color: white;
  padding: 0 24px 20px 24px;
  border-radius: 0 0 10px 10px;
  margin-bottom: 30px;
  .data-pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ant-pagination {
    background-color: white;
  }
  .pagination {
    &__link {
    }
    &__plus {
      font-size: 24px;
      padding-left: 10px;
    }
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
