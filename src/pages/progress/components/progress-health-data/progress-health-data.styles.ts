import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Wrapper = styled.div`
  .select_input__wrapper {
    width: 250px;
  }

  .progress {
    &__subtitle {
      font-size: 1.125rem;
      font-weight: 700;

      &-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.25rem;
        color: ${getColorCarry('primaryDark_v2')};
      }
    }

    &__highlight {
      &-container {
        display: flex;
        align-items: center;
      }

      &-btn {
        margin: 0 0.5rem;

        &:last-child {
          & svg {
            transform: rotate(180deg);
          }
        }

        @media ${mediaQueries.MOBILE} {
          padding: 0;
        }
      }
    }
  }
`

export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  @media ${mediaQueries.MOBILE} {
    grid-template-columns: 1fr 1fr;
  }
`
