import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  position: relative;
  padding-bottom: 6.875rem;

  @media ${mediaQueries.TABLET} {
    padding-bottom: 0;
    padding-top: 2.5rem;
  }

  .f-receivables {
    &__subtitle-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;

      @media ${mediaQueries.TABLET} {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__link {
      position: absolute;
      top: 0;
      right: 0;
      ${media('tablet', 'max')`
            display: block;
            position: static;
            margin-bottom: 24px;
        `}
    }

    &__subtitle {
      font-size: 1.375rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};

      @media ${mediaQueries.TABLET} {
        font-size: 1.125rem;
      }
    }

    &__range-select {
      width: 200px;

      @media ${mediaQueries.TABLET} {
        margin-top: 1.25rem;
        width: 100%;
      }
    }

    &__table-card {
      overflow: hidden;
    }
  }
`
