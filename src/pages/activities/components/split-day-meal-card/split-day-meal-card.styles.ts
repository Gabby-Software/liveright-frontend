import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  display: grid;
  grid-template-columns: 2fr 5fr;
  padding: 1.5rem 1.875rem;
  border-radius: 10px;
  background-color: ${getColorCarry('neutral_10')};
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  .SplitDayMealCard {
    &__title {
      font-size: 1.125rem;
      color: ${getColorCarry('neutral_70')};
      margin-bottom: 0.5rem;
    }

    &__subtitle {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      color: ${getColorCarry('neutral_70')};

      & svg {
        width: 18px;
        height: 18px;
        margin-right: 0.25rem;
      }
    }

    &__card {
      &:first-child {
        padding-right: 2rem;
        border-right: 1px solid ${getColorCarry('inputBorder_v2')};
      }

      &:last-child {
        padding-left: 2rem;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;

      &-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};
      }

      &-title {
        font-size: 0.875rem;
        color: ${getColorCarry('neutral_70')};
      }

      &-toggle {
        padding: 0;

        & svg {
          margin-right: 0.5rem;
        }
      }

      &-row {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }
    }

    &__macronutrients {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      margin: 0 -0.25rem;
      margin-bottom: 1.25rem;
    }

    &__macronutrient {
      padding: 1rem;
      border-radius: 10px;
      background-color: ${getColorCarry('neutral_100')};
      color: #fff;
      font-size: 0.875rem;
      font-weight: 400;
      min-width: 100px;
      margin: 0.25rem;

      &-value {
        font-size: 1.125rem;
        font-weight: 700;
      }
    }
  }
`
