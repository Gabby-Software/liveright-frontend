import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export default styled(Card)`
  align-items: center;
  background-color: ${getColorCarry('primaryDark_v2')};

  .card {
    &__title {
      color: #fff;
      opacity: 0.8;
      font-size: 1rem;
      font-weight: 500;
    }

    &__count {
      font-size: 2rem;
      font-weight: 700;
      color: #fff;

      span {
        font-size: 1.5rem;
        font-weight: 400;
      }
    }

    &__subtitle {
      font-size: 0.75rem;
      font-weight: 400;

      &.mutted {
        color: ${getColorCarry('neutral_50')};
      }

      &.white {
        color: #fff;
      }
    }
  }
`
