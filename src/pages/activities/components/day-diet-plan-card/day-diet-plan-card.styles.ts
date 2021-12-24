import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  .DayDietPlanCard {
    &__content {
      margin-bottom: 1.25rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__name {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};

      @media ${mediaQueries.TABLET} {
        font-size: 0.875rem;
      }

      &-container {
        display: flex;
        align-items: center;
        margin-bottom: 1.25rem;

        @media ${mediaQueries.TABLET} {
          margin-bottom: 0.75rem;
        }
      }

      &-icon {
        width: 34px;
        height: 34px;
        border-radius: 9999px;
        background-color: ${getColorCarry('primary_v2')};
        margin-right: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }
  }
`
