import styled from 'styled-components'

import { QuickAccessCard } from '../quick-access-card.styles'

export default styled(QuickAccessCard)`
  display: flex;
  justify-content: space-between;
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
