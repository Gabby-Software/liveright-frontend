import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../../../enums/screen-sizes.enum'
import {
  getColor,
  getColorCarry
} from '../../../../../../pipes/theme-color.pipe'

export default styled(Card)<any>`
  background-color: ${getColorCarry('secondary3_v2')};
  padding: 1.125rem 1rem;
  margin-bottom: 1.5rem;

  @media ${mediaQueries.MOBILE} {
    margin-bottom: 0;
    background-color: #fff;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .f-overview-label {
    &__title {
      font-size: 0.875rem;
      font-weight: 500;
      color: ${getColorCarry('secondary2_v2')};
      line-height: 1;
      padding-left: 1rem;
      margin-bottom: 0.75rem;
      position: relative;
      display: flex;
      align-items: center;

      &::before {
        content: '';
        width: 11px;
        height: 11px;
        border-radius: 2px;
        display: block;
        background-color: ${(props) =>
          props.$green
            ? getColor(props, 'green_90')
            : getColor(props, 'red_70')};
        position: absolute;
        left: 0;
      }
    }
    &__value {
      font-weight: 700;
      font-size: 1.375rem;
      color: ${getColorCarry('primaryDark_v2')};
      line-height: 1;
    }
    &__currency {
      font-size: 0.875rem;
      font-weight: 400;
    }
  }
`
