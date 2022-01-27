import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 0;

  @media ${mediaQueries.TABLET} {
    padding-bottom: 0;
  }

  .TemplateTable {
    &__filters {
      margin-bottom: 2rem;
      display: flex;

      @media ${mediaQueries.MOBILE} {
        flex-direction: column;
        margin-bottom: 1rem;
      }
    }

    &__select {
      width: 200px;
      margin-left: 1.25rem;

      @media ${mediaQueries.MOBILE} {
        width: 100%;
        margin-left: 0rem;
      }
    }

    &__search {
      width: 320px;

      @media ${mediaQueries.MOBILE} {
        width: 100%;
        margin-bottom: 0.5rem;
      }
    }

    &__link {
      color: ${getColorCarry('link')};
    }
  }
`
