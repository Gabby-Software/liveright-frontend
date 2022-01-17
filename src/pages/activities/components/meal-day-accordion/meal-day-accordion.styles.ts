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

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }
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

    &__checkbox {
      margin: 0 0.75rem;

      &-container {
        display: flex;
        align-items: center;
        margin-top: 1.5rem;
      }
    }
  }
`
