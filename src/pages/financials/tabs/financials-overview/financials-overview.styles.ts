import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  @media ${mediaQueries.MOBILE} {
    padding-bottom: 0;
    padding-top: 2.5rem;
  }

  .f-overview {
    &__view-btn {
      width: 100%;
    }

    &__cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-top: 1.25rem;
    }

    &__range {
      max-width: 200px;

      @media ${mediaQueries.MOBILE} {
        max-width: 100%;
      }
    }

    &__chart-range {
      margin-bottom: 1.875rem;
    }
    &__graph {
      margin: 1rem 0;
      display: flex;
      flex-direction: row;

      @media ${mediaQueries.MOBILE} {
        margin: 1.25rem 0;
      }

      ${media('tablet', 'max')`
            display: block;
        `}

      &__left {
        flex: 1;

        ${media('tablet', 'max')`
                padding-right:0;
            `};
      }
      &__right {
        width: 144px;
      }
      &__title {
        font-size: 1.125rem;
        font-weight: 700;
        color: ${getColorCarry('primaryDark_v2')};
      }
      &__body {
        background-color: white;
        border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
        padding: 24px;
        margin-top: 24px;
        max-height: 350px;
      }
    }

    &__chart-container {
      padding-top: 2rem;
    }
  }
`
