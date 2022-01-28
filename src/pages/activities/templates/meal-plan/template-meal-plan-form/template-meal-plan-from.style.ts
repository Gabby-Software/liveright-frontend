import styled from 'styled-components'

import Card from '../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  margin: 2rem 0;

  .Title {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${getColorCarry('primaryDark2_v2')};
    margin: 1rem 0;
  }
`

export const MealStyles = styled(Card)`
  background-color: ${getColorCarry('white')};
  padding: 1.5rem;

  .invalid-field .ant-select-selector,
  .invalid-field .ant-picker {
    border-color: #ef1733;
  }

  .Meal {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      &-title {
        display: flex;
        align-items: center;

        & .subtitle {
          font-size: 1.175rem;
          font-weight: 700;
          color: ${getColorCarry('neutral_100')};
        }
      }

      &-icon {
        width: 34px;
        height: 34px;
        min-width: 34px;
        min-height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 9999px;
        background-color: ${getColorCarry('primary_v2')};
        margin-right: 1rem;
        color: #fff;

        & svg {
          width: 20px;
          height: 20px;
        }
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
      margin: 1.25rem -0.25rem;
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

    &__time-picker {
      max-width: 300px;
    }

    &__food-container {
      margin-bottom: 1.25rem;
    }

    &__clickable-container {
      cursor: pointer;
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
