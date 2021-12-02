import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)<any>`
  background-color: ${getColorCarry('neutral_10')};
  padding: 0;
  color: ${getColorCarry('neutral_100')};
  margin-bottom: 1.25rem;

  .CurrentPlanAccordion {
    &__summary {
      padding: 1.25rem 1rem;
      cursor: pointer;
    }

    &__content {
      padding: 0 1rem 1.25rem 1rem;

      &-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        color: ${getColorCarry('neutral_70')};

        & svg {
          color: ${getColorCarry('primary_v2')};
        }
      }
    }

    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 1.25rem;
    }

    &__icon {
      width: 40px;
      height: 40px;
      min-width: 40px;
      min-height: 40px;
      background-color: ${(props: any) => props.$color};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      border-radius: 9999px;
      color: #fff;

      & svg {
        width: 20px;
        height: 20px;
      }
    }

    &__title {
      font-size: 1rem;
      font-weight: 500;
    }

    &__action {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${getColorCarry('link')};
    }

    &__cta {
      display: flex;
      align-items: center;
    }

    &__time {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_70')};
      margin-right: 1.25rem;
    }
  }
`
