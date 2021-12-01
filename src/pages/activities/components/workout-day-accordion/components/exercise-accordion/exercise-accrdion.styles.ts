import styled from 'styled-components'

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
