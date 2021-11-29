import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  color: ${getColorCarry('neutral_100')};
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }

  .PlanCard {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    &__name {
      font-size: 1rem;
      font-weight: 500;
    }

    &__subtitle {
      font-size: 0.875rem;

      & span {
        color: ${getColorCarry('neutral_70')};
      }
    }

    &__info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__row {
      &-title {
        font-size: 0.75rem;
        color: ${getColorCarry('neutral_70')};
      }

      &-value {
        font-size: 0.875rem;
      }
    }
  }
`
