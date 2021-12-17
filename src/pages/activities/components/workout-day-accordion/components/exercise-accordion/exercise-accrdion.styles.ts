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
  }
`

export const PrefixStyles = styled(WorkoutSubtitle)`
  position: absolute;
  top: -1.25rem;
  left: 0;
`
