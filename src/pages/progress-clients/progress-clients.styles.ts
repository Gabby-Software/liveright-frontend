import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled.div`
  @media ${mediaQueries.MOBILE} {
    padding-top: 1.25rem;
  }

  .progress {
    &__title {
      font-size: 2rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      padding: 2.5rem 0;
    }

    &__filters-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3.125rem;

      @media ${mediaQueries.MOBILE} {
        margin-bottom: 1.25rem;
      }
    }

    &__search {
      width: 350px;
    }

    &__client {
      width: 250px;
    }

    &__cards-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.875rem;

      @media ${mediaQueries.MOBILE} {
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }
    }
  }
`
