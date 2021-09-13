import { Button } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
  overflow: auto;
  margin-bottom: 1.5rem;
`
export const Pagination = styled.div`
  width: 100%;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 1rem 1.5rem 1rem;

  .data-pagination {
  }

  .ant-pagination {
  }

  .pagination {
    &__link {
      & svg {
        margin-left: 0.5rem;
      }
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
