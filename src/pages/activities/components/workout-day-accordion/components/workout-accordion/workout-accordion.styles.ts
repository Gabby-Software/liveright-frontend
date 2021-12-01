import styled from 'styled-components'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .WorkoutAccordion {
    &__control {
      margin-bottom: 1rem;
    }

    &__controls {
      margin-bottom: 2rem;
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
