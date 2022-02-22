import styled from 'styled-components'

import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .WorkoutDayForm {
    &__add-workout {
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      color: ${getColorCarry('link')};
      border: 1px dashed ${getColorCarry('link')};
      border-radius: 10px;
      cursor: pointer;

      & svg {
        margin-right: 0.5rem;
      }
    }
  }
`
