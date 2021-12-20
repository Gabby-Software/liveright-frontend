import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  background-color: ${getColorCarry('neutral_10')};
  padding: 1.5rem;
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }

  .Meal {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .subtitle {
        color: ${getColorCarry('neutral_100')};
      }
    }

    &__name {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr auto;
      gap: 1.25rem;
      align-items: flex-end;
      margin-bottom: 1.25rem;
    }

    &__delete-btn {
      color: ${getColorCarry('red')};
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

    &__checkbox {
      margin: 0 0.75rem;

      &-container {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
      }
    }

    &__food-container {
      margin-bottom: 1.25rem;
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 1.5rem;
    }

    &__add-btn {
      display: flex;
      align-items: center;
      color: ${getColorCarry('link')};
      cursor: pointer;

      & svg {
        margin-right: 0.25rem;
        width: 16px;
      }
    }
  }
`

export const MealSubtitle = styled.p`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  color: ${getColorCarry('primaryDark_v2')};
  margin-bottom: 1.25rem;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${getColorCarry('inputBorder_v2')};
    margin-left: 1.25rem;
  }
`
