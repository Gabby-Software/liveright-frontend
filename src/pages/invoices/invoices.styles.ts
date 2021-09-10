import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  padding-bottom: 5rem;

  @media ${mediaQueries.MOBILE} {
    padding-bottom: 0;
    padding-top: 2.5rem;
  }

  .invoices {
    &__subtitle {
      font-size: 1.375rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark2_v2')};
      margin-bottom: 1.25rem;

      @media ${mediaQueries.MOBILE} {
        font-size: 1.125rem;
      }
    }

    &__body {
      max-width: 1300px;
    }
  }
`
