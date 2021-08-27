import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.div`
  width: 100%;
  display: flex;
  background-color: ${getColorCarry('primaryDark_v2')};
  border-radius: 10px;
  color: #fff;
  padding: 1.25rem 0;
  margin-bottom: 1.875rem;

  .current-date-card {
    &__item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid ${getColorCarry('neutral_50')};

      &:last-child {
        border-right: 0;
      }
    }

    &__item-title {
      color: ${getColorCarry('neutral_50')};
      font-size: 0.875rem;
      line-height: 1.25rem;

      @media ${mediaQueries.MOBILE} {
        font-size: 0.75rem;
      }
    }

    &__item-value {
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.5rem;

      @media ${mediaQueries.MOBILE} {
        font-size: 0.875rem;
      }
    }

    &__item-container {
      margin-left: 1.875rem;

      @media ${mediaQueries.MOBILE} {
        margin-left: 0.75rem;
      }
    }
  }
`
