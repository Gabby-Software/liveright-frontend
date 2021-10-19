import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export default styled(Card)<any>`
  align-items: center;
  background-color: ${getColorCarry('primaryDark_v2')};
  padding: 1.125rem 1rem;

  .f-overview-label {
    &__title {
      color: #fff;
      opacity: 0.8;
      font-size: 1rem;
      font-weight: 400;
    }

    &__value {
      font-size: 2rem;
      font-weight: 700;
      color: #fff;
      display: inline-block;
    }

    &__note {
      margin-left: 10px;
      font-weight: normal;
      font-size: 22px;
      line-height: 32px;
      display: inline-block;
      color: ${(props) =>
        props.$green ? getColorCarry('green_90') : getColorCarry('red_50')};
    }

    &__currency {
      font-size: 0.875rem;
      font-weight: 400;
      margin-left: 5px;
    }
  }
`
