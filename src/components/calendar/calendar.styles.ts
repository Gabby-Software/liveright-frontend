import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'
import Card from '../cards/card/card.component'

export const Styles = styled(Card)`
  box-shadow: 0 0 40px rgba(230, 45, 71, 0.03);
  padding: 0;
`

export const ToolbarStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: ${getColorCarry('neutral_10')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid ${getColorCarry('neutral_30')};
  padding: 0 1rem;

  .calendar-toolbar {
    &__label {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__tabs {
      margin-left: -1rem;

      &.ant-tabs {
        height: 100%;
      }

      & .ant-tabs-nav {
        height: 100%;
        margin-bottom: 0;
        background-color: transparent;

        &::before {
          border-bottom: 0;
        }
      }
    }

    &__search {
      width: 265px;

      & .ant-input {
        font-size: 0.75rem;
      }

      & .ant-input-suffix {
        width: 20px;
        height: 20px;
        margin-top: 0.5rem;
      }
    }
  }
`
