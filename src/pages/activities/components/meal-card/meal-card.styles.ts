import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  background-color: ${getColorCarry('neutral_10')};
  border-radius: 10px;
  min-width: 125px;
  margin: 1rem 0;
  padding-bottom: 1rem;

  .MealCard {
    margin-bottom: 1rem;
    &__name {
      font-size: 0.875rem;
      color: ${getColorCarry('neutral_40')};
      font-weight: 700;
    }

    &__nutrients {
      display: flex;
      gap: 4px;
    }

    &__meal {
      margin: 0 1rem;
      font-size: 0.875rem;
      color: ${getColorCarry('neutral_70')};

      & .meal-food {
        margin: 0.5rem 0;
      }
    }
  }
`
