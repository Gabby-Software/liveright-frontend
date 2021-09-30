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
      display: grid;
      grid-template-columns: 1fr 250px;
      gap: 1.875rem;

      @media ${mediaQueries.TABLET} {
        grid-template-columns: 1fr;
      }

      &-card {
        padding: 1.25rem 1.875rem;
      }

      &-date {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.875rem;
        margin-bottom: 1.875rem;

        @media ${mediaQueries.TABLET} {
          grid-template-columns: 1fr;
        }
      }
    }

    &__submit {
      width: 100%;
      margin-bottom: 1.25rem;
    }
  }
`
