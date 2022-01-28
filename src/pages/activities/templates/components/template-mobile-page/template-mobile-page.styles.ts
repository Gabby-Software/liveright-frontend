import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  padding: 2rem;

  @media ${mediaQueries.MOBILE} {
    padding: 2rem 1.5rem;
    background-color: white;
    border-radius: 10px;
  }

  .TSTemplates {
    &__title {
      font-size: 2rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark2_v2')};

      @media ${mediaQueries.MOBILE} {
        font-size: 18px;
      }

      &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.875rem;
      }

      &-buttons {
        display: flex;
        align-items: center;
      }

      &-button {
        margin-right: 1.25rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 1.25rem;
    }
  }
`
