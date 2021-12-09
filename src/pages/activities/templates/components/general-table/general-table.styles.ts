import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export const Styles = styled.table`
  padding: 0;
  width: 100%;
  font-size: 0.875rem;
  @media ${mediaQueries.TABLET} {
    padding-bottom: 0;
  }

  .general-table {
    &__head {
      text-align: left;
      color: ${getColorCarry('neutral_50')};
      font-weight: 500;
      border-bottom: solid 1px ${getColorCarry('neutral_30')};
    }

    &__th {
      &-container {
        margin: 0.5rem;
      }
    }

    &__td {
      &-container {
        margin: 0.5rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_70')};
      }
    }
  }
`
