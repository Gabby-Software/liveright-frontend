import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'

export const Styles = styled(Card)`
  height: 100%;

  .add-event {
    &__control {
      margin-bottom: 1.25rem;
    }

    &__date-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.25rem;
    }
  }
`
