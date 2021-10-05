import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled(Card)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;

  @media ${mediaQueries.TABLET} {
    align-items: flex-start;
  }

  .notification {
    &__icon {
      min-width: 40px;
      min-height: 40px;
      width: 40px;
      height: 40px;
      border-radius: 9999px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      background-color: ${getColorCarry('secondary2_v2')};
      &__info {
        background-color: ${getColorCarry('secondary2_v2')};
      }
      &__invoice {
        background-color: ${getColorCarry('green_20')};
        color: ${getColorCarry('green_80')};
      }
      &__session {
        background-color: ${getColorCarry('yellow_20')};
        color: ${getColorCarry('yellow_80')};
      }
    }

    &__data {
      flex: 1;
      margin: 0 12px;
      display: flex;
      justify-content: space-between;

      @media ${mediaQueries.TABLET} {
        flex-direction: column;
      }
    }
    &__content {
      font-size: 1rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};
    }
    &__datetime {
      font-size: 1rem;
      font-weight: 400;
      color: ${getColorCarry('secondary2_v2')};

      @media ${mediaQueries.TABLET} {
        margin: 0.25rem 0;
      }
    }

    &__link {
      align-self: center;
      color: ${getColorCarry('link')};
    }

    &__action {
      margin: 0 1.875rem;
      min-width: 162px;
    }
  }
`
