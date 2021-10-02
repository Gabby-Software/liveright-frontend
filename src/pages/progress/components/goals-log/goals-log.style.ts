import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'

export const Styles = styled.div<any>`
  @media ${mediaQueries.TABLET} {
    padding-top: ${(props) => (props.$client ? '1.25rem' : 0)};
  }

  .log-goals {
    &__title {
      font-size: 1.125rem;
      font-weight: 700;
      margin-bottom: 1.875rem;
    }

    &__form {
      &-card {
        padding: 1.25rem 1.875rem;
      }
    }

    &__submit {
      width: 100%;
      margin-bottom: 1.25rem;
    }
  }
`
