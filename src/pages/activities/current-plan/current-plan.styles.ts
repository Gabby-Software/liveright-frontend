import styled from 'styled-components'

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
      }
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 1.5rem;
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
