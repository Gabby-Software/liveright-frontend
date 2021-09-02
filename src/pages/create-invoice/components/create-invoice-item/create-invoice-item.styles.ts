import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled(Card)`
  position: relative;
  background-color: ${getColorCarry('secondary3_v2')};
  margin-bottom: 1.25rem;

  .ci-item {
    &__row {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    &__sub-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1rem;
    }

    &__credits {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};

      & span {
        font-weight: 500;
        color: ${getColorCarry('primary_v2')};
      }
    }

    &__total {
      font-weight: 600;
      font-size: 14px;
    }

    &__remove {
      color: ${getColorCarry('primary_v2')};
    }
  }
`
