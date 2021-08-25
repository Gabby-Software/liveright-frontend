import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled(Card)`
  margin-bottom: 1rem;
  .session-card {
    &__container {
      display: flex;
      justify-content: space-between;
    }

    &__info {
    }

    &__date {
      background-color: ${getColorCarry('red_10')};
      border-radius: 8px;
      color: ${getColorCarry('red_80')};
      font-weight: 500;
      font-size: 1rem;
      padding: 0.5rem 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
    }

    &__title {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    &__date-item {
      display: flex;
      align-items: center;

      & svg {
        margin-left: 1rem;
      }
    }
  }
`
