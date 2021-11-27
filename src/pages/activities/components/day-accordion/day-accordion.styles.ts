import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)<any>`
  padding: 0;
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 1.25rem;
  }

  .DayAccordion {
    &__summary {
      padding: 1.5rem 1.875rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-icon {
        width: 34px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 9999px;
        background-color: ${getColorCarry('primary_v2')};
        margin-right: 1rem;
        color: #fff;
      }

      &-title {
        font-size: 1.175rem;
        font-weight: 700;
        color: ${getColorCarry('primaryDark_v2')};

        &-container {
          display: flex;
          align-items: center;
        }
      }

      &-btn {
        width: 44px;
        display: flex;
        justify-content: center;
        align-items: center;

        & svg {
          transform: ${(props) => (props.$open ? 'rotate(180deg)' : 'none')};
        }
      }
    }

    &__actions {
      display: flex;
      align-items: center;
    }

    &__delete-btn {
      width: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${getColorCarry('red')};
      margin-right: 0.5rem;
    }

    &__content {
      padding: 0 1.875rem 1.5rem 1.875rem;
    }
  }
`
