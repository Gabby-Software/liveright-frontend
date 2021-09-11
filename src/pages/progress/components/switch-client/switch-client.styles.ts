import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'

export const Content = styled(Card)`
  .switch-client {
    &__select {
      margin-bottom: 2rem;

      & .select__control {
        height: 64px;
        padding-left: 2.5rem;
        padding-right: 1rem;
      }

      & .select__prefix {
        left: 1.25rem;
      }
    }
  }
`
