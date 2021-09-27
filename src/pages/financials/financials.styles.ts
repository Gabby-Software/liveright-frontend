import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  .financials {
    &__title-container {
      padding-top: 2.5rem;
      display: flex;
      justify-content: space-between;
    }

    &__title {
      font-size: 2rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__tabs {
      margin-bottom: 0;

      @media ${mediaQueries.MOBILE} {
        width: 100%;
        margin: 0;
        border-radius: 0;
      }

      &-container {
        margin: 2.75rem 0 1.5rem 0;
        position: relative;
        display: flex;
        align-items: center;

        @media ${mediaQueries.MOBILE} {
          width: auto;
          margin: 0 -1.25rem 0 -1.25rem;
          border-radius: 0;
          padding: 0;
          
          & .tabs__wrapper {
            justify-content: center;
          }

          & .tabs__item__wrapper {
            &:not(:first-child) {
              margin-left: 1.5rem;
            }
          }
        }
      }
    }
  }
`
