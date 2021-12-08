import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem 0;

  @media ${mediaQueries.TABLET} {
    padding-bottom: 0;
  }

  .EditPlan {
    &__overview {
      margin-bottom: 1.25rem;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }

    &__controls {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 2rem;

      @media ${mediaQueries.TABLET} {
        display: flex;
        flex-direction: column;
        gap: unset;
      }
    }

    &__input {
      @media ${mediaQueries.TABLET} {
        margin-bottom: 1.25rem;
      }
    }

    &__add-new-day {
      padding: 1rem;
      font-weight: 500;
      font-size: 0.875rem;
      color: ${getColorCarry('neutral_70')};
      border: 1px dashed ${getColorCarry('neutral_70')};
      border-radius: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;

      & svg {
        margin-right: 0.5rem;
      }
    }
  }
`
