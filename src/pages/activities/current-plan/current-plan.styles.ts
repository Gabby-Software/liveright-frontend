import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;

  .CurrentPlan {
    &__card {
      margin-bottom: 1.5rem;
    }

    &__title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    &__picker {
      display: flex;
      align-items: center;

      &-title {
        font-size: 1.125rem;
        font-weight: 500;
        color: ${getColorCarry('neutral_70')};

        & span {
          font-size: 1rem;
          color: ${getColorCarry('neutral_50')};
        }
      }

      &-btn {
        color: ${getColorCarry('neutral_70')};

        &:last-child {
          svg {
            transform: rotate(180deg);
          }
        }

        &-container {
          display: flex;
          align-items: center;
        }
      }

      &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;

        @media ${mediaQueries.TABLET} {
          flex-direction: column;
          align-items: unset;
        }
      }

      &-row {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-title {
          font-size: 1rem;
          font-weight: 500;
        }

        &-subtitle {
          font-size: 0.875rem;
          color: ${getColorCarry('neutral_70')};
        }
      }
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 1.5rem;
    }

    &__no-activity {
      margin: 5rem 0;
      text-align: center;
    }

    &__log-text {
      font-size: 1rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_70')};

      & span {
        color: ${getColorCarry('link')};
        font-weight: 500;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__text {
      font-size: 1rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_70')};
    }

    &__overview-title {
      margin-bottom: 1.875rem;
    }
  }
`
