import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;

  .invoice-filters {
    &__search {
      width: 320px;
      margin-right: 1.25rem;

      @media ${mediaQueries.TABLET} {
        width: auto;
        flex: 1;
        margin-right: 1rem;
      }
    }

    &__status {
      width: 200px;
      margin-right: 1.25rem;
    }

    &__issuer {
      width: 200px;
    }

    &__search-btn {
      background-color: #fff;
      color: ${getColorCarry('secondary4_v2')};
    }
  }
`

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;

  & .invoice-filters__status {
    margin-bottom: 1rem;
  }

  & .invoice-filters__issuer {
    margin-bottom: 1.875rem;
  }
`
