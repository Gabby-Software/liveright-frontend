import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)<any>`
  padding: 0;
  background-color: ${getColorCarry('neutral_10')};
  margin-bottom: 1rem;
  color: ${getColorCarry('neutral_100')};

  &:last-child {
    margin-bottom: 0;
  }

  .ItemAccordion {
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

    &__divider {
      margin: 0 1rem;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
    }

    &__content {
      padding: 0 1rem 1.25rem 1rem;
    }
  }
`
