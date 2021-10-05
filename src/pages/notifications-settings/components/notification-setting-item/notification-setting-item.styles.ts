import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled(Card)`
  .settings-item {
    &__title {
      font-size: 1.375rem;
      font-weight: 700;
      line-height: 2rem;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin: 1.5rem 0;
    }

    &__actions {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10rem;

      @media ${mediaQueries.TABLET} {
        display: flex;
        flex-direction: column;
        gap: 0;
      }
    }

    &__action {
      @media ${mediaQueries.TABLET} {
        margin-bottom: 1.5rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`
