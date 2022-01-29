import styled from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .invalid-field .ant-select-selector,
  .invalid-field .ant-picker {
    border-color: #ef1733;
  }

  .MealAccordion {
    &__control {
      margin-bottom: 1rem;
    }

    &__macronutrients {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      margin-bottom: 1rem;
      -ms-overflow-style: none;
      scrollbar-width: none; /* Firefox */

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }
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
