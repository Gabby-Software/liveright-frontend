import styled from 'styled-components'

import { mediaQueries } from '../../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  .compare-photos {
    &__container {
      display: flex;
      align-items: center;
      margin: 1.25rem 0;

      @media ${mediaQueries.TABLET} {
        width: 100%;
        flex-direction: column;
      }
    }

    &__field {
      margin-right: 1.25rem;
      width: 100%;
      max-width: 250px;

      @media ${mediaQueries.TABLET} {
        max-width: 100%;
        margin-bottom: 1.25rem;
        margin-right: 0;
      }
    }

    &__button {
      @media ${mediaQueries.TABLET} {
        width: 100%;
      }
    }

    &__divider {
      margin: 0 3rem;
      font-size: 3rem;
      font-weight: 700;
      color: ${getColorCarry('primary_v2')};

      @media ${mediaQueries.TABLET} {
        font-size: 1.375rem;
        margin: 2rem 3rem;
      }
    }

    &__card {
      display: flex;
      flex-direction: row;
      align-items: center;

      @media ${mediaQueries.TABLET} {
        flex-direction: column;
      }
    }
  }
`
