import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .DaySplitEditFocusView {
    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;

      @media ${mediaQueries.TABLET} {
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 2.5rem;
      }
    }

    &__title {
      &-container {
        display: flex;
        align-items: center;

        @media ${mediaQueries.TABLET} {
          margin-bottom: 1rem;
        }
      }

      &-arrows {
        display: flex;
        align-items: center;
        margin: 0 1.25rem;

        & button {
          margin-right: 0.5rem;

          &:last-child {
            margin-right: 0;
            & svg {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
`
