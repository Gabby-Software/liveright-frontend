import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  @media ${mediaQueries.MOBILE} {
    padding-top: 1.25rem;
  }

  .settings {
    &__title {
      font-size: 2rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 1rem;
    }

    &__cards {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 1.875rem;

      @media ${mediaQueries.MOBILE} {
        grid-template-columns: 1fr;
      }
    }
  }

  .settings-item {
    &__title {
      font-size: 1.375rem;
      font-weight: 700;
      line-height: 2rem;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin: 1.5rem 0;
    }

    &__actions {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;

      @media ${mediaQueries.MOBILE} {
        display: flex;
        flex-direction: column;
        gap: 0;
      }
    }

    &__action {
      @media ${mediaQueries.MOBILE} {
        margin-bottom: 1.5rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`
