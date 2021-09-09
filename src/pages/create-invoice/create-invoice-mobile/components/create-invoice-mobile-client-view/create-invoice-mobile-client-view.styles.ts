import styled from 'styled-components'

import Card from '../../../../../components/cards/card/card.component'

export default styled(Card)`
  counter-increment: create-section;
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .ci-preview__client {
    &__label {
      color: ${(p) => p.theme.vars.colors.secondary3};
    }
    &__value {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      font-weight: 600;
      padding-left: 10px;
    }
  }
`
