import { Button } from 'antd'
import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'

export const Wrapper = styled(Card)`
  overflow: auto;
  margin-bottom: 1.5rem;

  .health-log {
    &__table {
      width: auto;
      margin: -1.5rem -1.75rem 0 -1.75rem;
    }
  }
`
export const Pagination = styled.div`
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
