import styled from 'styled-components'

import { WorkoutSubtitle } from '../workout/workout.styles'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .ExerciseAccordion {
    &__controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    &__name {
      margin-bottom: 1rem;
    }

    &__checkbox {
      margin: 0 0.75rem;

      &-container {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
      }
    }
  }

  .exercise-input {
    display: flex;
    align-items: center;

    &__prefix {
      width: 40px;
      margin-top: 25px;
    }
  }
`

export const PrefixStyles = styled(WorkoutSubtitle)`
  position: absolute;
  top: -1.25rem;
  left: 0;
`
