import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)<any>`
  padding: 0;
  background-color: ${getColorCarry('neutral_10')};
  margin-bottom: 1rem;
  color: ${getColorCarry('neutral_100')};

  &:last-child {
    margin-bottom: 0;
  }

  .WorkoutAccordion {
    &__summary {
      padding: 1.25rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-caret {
        width: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        & svg {
          transform: ${(props: any) =>
            props.$open ? 'rotate(180deg)' : 'none'};
        }
      }

      &-title {
        font-size: 1rem;
        font-weight: 500;
      }

      &-actions {
        display: flex;
        align-items: center;
      }

      &-remove-btn {
        color: ${getColorCarry('red')};
        margin-right: 0.5rem;

        & svg {
          width: 18px;
          height: 18px;
        }
      }
    }

    &__content {
      padding: 0 1rem 1.25rem 1rem;
    }

    &__control {
      margin-bottom: 1rem;
    }

    &__controls {
      margin-bottom: 2rem;
    }

    &__actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      padding-top: 0.5rem;
    }

    &__action-btn {
      padding: 0;
      width: 100%;
      font-size: 0.75rem;

      & svg {
        width: 16px;
        height: 16px;
        margin-right: 0.5rem;
      }
    }
  }
`
