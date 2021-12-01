import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)<any>`
  background-color: ${getColorCarry('neutral_10')};
  padding: 0;
  font-size: 0.875rem;
  color: ${getColorCarry('neutral_100')};
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  .DayCardAccordion {
    &__summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem;
      cursor: pointer;
    }

    &__content {
      padding: 1.25rem;
      position: relative;

      &::before {
        content: '';
        display: block;
        width: calc(100% - 2.5rem);
        height: 1px;
        background-color: ${getColorCarry('inputBorder_v2')};
        position: absolute;
        top: 0;
        left: 1.25rem;
      }

      &-item {
        padding: 0 0 0 1.25rem;
        position: relative;
        margin-bottom: 1.25rem;

        &:last-child {
          margin-bottom: 0;
        }

        &::before {
          content: '';
          display: block;
          width: 2px;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background-color: ${getColorCarry('orange')};
          border-radius: 1px;
        }

        &-subtitle {
          font-size: 0.75rem;
          color: ${getColorCarry('neutral_70')};
        }
      }

      &-sub-item {
        margin-bottom: 0.5rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`
