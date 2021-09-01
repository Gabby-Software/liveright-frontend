import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled(Card)`
  position: relative;
  width: auto;
  border: 1px solid ${getColorCarry('inputBorder_v2')};
  padding: 1rem 1.25rem;

  .ci-cc {
    &__user-card {
      width: fit-content;
    }

    &__btn {
      color: ${getColorCarry('primary_v2')};
      margin-left: 0.5rem;
    }
  }
`
