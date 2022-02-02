import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .MealDayForm {
    &__add-meal {
      display: flex;
      align-items: center;
      padding: 1.25rem;
      margin-top: 1rem;
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
