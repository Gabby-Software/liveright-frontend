import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'

export const Styles = styled.div`
  width: 100%;

  .content {
    &__tabs {
      @media ${mediaQueries.TABLET} {
        margin: 0 0 1.875rem 0;
      }
    }
  }
`
