import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  margin-bottom: 1.5rem;

  @media ${mediaQueries.MOBILE} {
    margin-bottom: 0;
  }

  .create-invoice {
    &__section-title {
      counter-increment: create-section;
      font-size: 0.875rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 1.375rem;

      &:before {
        content: counter(create-section) '. ';
      }
    }

    &__content {
      padding: 0 1.125rem;

      @media ${mediaQueries.MOBILE} {
        padding: 0;
      }
    }
  }
`
