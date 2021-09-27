import styled from 'styled-components'

import { QuickAccessCard } from '../quick-access-card.styles'

export default styled(QuickAccessCard)<any>`
  display: flex;
  justify-content: ${(props) => (props.$center ? 'center' : 'space-between')};

  .qa-log {
    &__quality {
      &__label {
        color: #404040;
      }
      &__value {
        height: 70px;
        width: 98px;
        display: flex;
        align-items: center;
        font-size: 18px;
      }
    }
  }
  .text_input {
    &__label {
      color: #404040;
    }
    &__input {
      height: 70px;
      width: 98px;
      font-size: 18px;
      text-align: center;
    }
  }
`
