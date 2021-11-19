import styled from 'styled-components'

export const Styles = styled.div`
  padding: 2rem 0;

  .edit-training-plan {
    &__overview {
      margin-bottom: 1.25rem;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }

    &__controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`
