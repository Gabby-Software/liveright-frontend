import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)<any>`
  padding: 0;
  background-color: ${getColorCarry('neutral_10')};
  margin-bottom: 1.25rem;

  .CurrentPlanCard {
    &__summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;

      &-content {
        display: flex;
        align-items: flex-start;
      }

      &-icon {
        height: 40px;
        width: 40px;
        background-color: ${(props) => props.$color};
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }

      &-time {
        font-size: 1rem;
        color: ${getColorCarry('neutral_70')};
        margin: 0 2.5rem;
      }

      &-title {
        font-size: 1rem;
        color: ${getColorCarry('neutral_100')};
        font-weight: 500;
      }

      &-btn {
        font-size: 0.875rem;
        font-weight: 500;
        color: ${getColorCarry('link')};
        background-color: transparent;
        border: 0;
        padding: 0;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }

        &-text {
          font-size: 0.875rem;
          font-weight: 400;
          color: ${getColorCarry('neutral_70')};
          display: block;
          margin-right: 0.25rem;
        }

        &-container {
          display: flex;
          align-items: center;
        }
      }
    }

    &__content {
      padding: 0 1.5rem 1.25rem 1.5rem;

      &-item {
        font-size: 0.875rem;
        color: ${getColorCarry('neutral_70')};
        padding: 0.25rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & svg {
          color: ${getColorCarry('primary_v2')};
        }
      }
    }
  }
`
