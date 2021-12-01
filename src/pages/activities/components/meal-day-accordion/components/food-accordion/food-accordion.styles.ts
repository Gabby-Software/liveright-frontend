import styled from 'styled-components'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .FoodAccordion {
    &__control {
      margin-bottom: 1rem;
    }

    &__controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }
  }
`
