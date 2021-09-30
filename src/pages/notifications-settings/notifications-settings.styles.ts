import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  @media ${mediaQueries.TABLET} {
    padding-top: 1.25rem;
  }

  .settings {
    &__title {
      font-size: 2rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 1rem;
    }

    &__subtitle {
      font-size: 1rem;
      font-weight: 400;
      color: ${getColorCarry('dark_v2')};
      margin-bottom: 2.5rem;
    }

    &__cards {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.875rem;

      @media ${mediaQueries.TABLET} {
        grid-template-columns: 1fr;
      }
    }

    &__text {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('dark_v2')};
    }
  }
`
