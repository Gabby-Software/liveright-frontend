import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  .MealDayAccordion {
    &__macronutrients {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      margin: 0 -0.25rem;
      margin-bottom: 2rem;
    }

    &__name {
      &-container {
        display: flex;
        margin-bottom: 2.5rem;
      }
    }

    &__subtitle {
      font-size: 0.875rem;
      color: ${getColorCarry('neutral_70')};
      margin-bottom: 1rem;
      font-weight: 500;
    }

    &__add-meal {
      display: flex;
      align-items: center;
      padding: 1.25rem;
      border: 1px dashed ${getColorCarry('inputBorder_v2')};
      color: ${getColorCarry('link')};
      border-radius: 15px;
      cursor: pointer;

      & svg {
        width: 16px;
      }
    }
  }
`
