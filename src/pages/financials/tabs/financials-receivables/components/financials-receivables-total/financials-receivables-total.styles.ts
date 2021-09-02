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
    }

    &__subtitle {
      color: ${getColorCarry('neutral_50')};
      font-size: 0.75rem;
      font-weight: 400;
    }
  }
`
