import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  border: 1px solid ${getColorCarry('inputBorder_v2')};

  @media ${mediaQueries.TABLET} {
    border: 0;
    margin-bottom: 1.25rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .day-card {
    &__title {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};

      @media ${mediaQueries.TABLET} {
        font-size: 0.875rem;
      }
    }

    &__subtitle {
      font-size: 1rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_70')};
    }
    
    &__header {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;

      @media ${mediaQueries.TABLET} {
        margin-bottom: 1.25rem;
      }

      &-title-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &-icon {
        color: ${getColorCarry('secondary2_v2')};
        width: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`
