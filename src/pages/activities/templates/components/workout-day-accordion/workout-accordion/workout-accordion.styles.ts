import styled from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .WorkoutAccordion {
    &__control {
      margin-bottom: 1rem;
    }

    &__controls {
      margin-bottom: 0.5rem;
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

      &.open-superset {
        color: ${getColorCarry('primary_v2')};
      }

      &.close-superset {
        color: ${getColorCarry('red')};
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
  }
`
