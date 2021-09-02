import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const LinkStyles = styled(Link)`
  display: block;
  width: auto;
  margin-right: 0.875rem;

  &:last-child {
    margin-right: 0;
  }
`

export const Styles = styled(Card)`
  flex-direction: column;
  min-width: 330px;

  .invoice-card {
    &__row {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: 1.875rem;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__number {
      font-size: 1.125rem;
      color: ${getColorCarry('primaryDark2_v2')};
      font-weight: 700;
      line-height: 1.25;
      white-space: nowrap;
    }

    &__issuer {
      color: ${getColorCarry('secondary4_v2')};
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.25;
      white-space: nowrap;
    }

    &__price {
      font-size: 2rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      white-space: nowrap;

      & span {
        font-size: 1.125rem;
        font-weight: 400;
      }
    }

    &__btn {
      min-width: 130px;
      margin-left: 1rem;
    }
  }
`
