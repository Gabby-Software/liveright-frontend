import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  color: ${getColorCarry('neutral_100')};
  padding: 2rem 0;

  .TrainingSplitDayView {
    &__card {
      margin-bottom: 1.25rem;
    }

    &__back {
      padding: 0;
      margin-bottom: 1.25rem;
    }

    &__title-container {
      display: flex;
      align-content: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 1.5rem;
    }

    &__badges {
      display: flex;
      align-content: center;
    }

    &__badge {
      margin-right: 1.25rem;

      &-name {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_70')};
        margin-bottom: 0.25rem;
      }

      &-badge {
        padding: 0.5rem 1rem;
        background-color: ${getColorCarry('neutral_10')};
        border-radius: 10px;
        font-size: 0.875rem;
      }
    }

    &__day {
      &-title {
        display: flex;
        align-items: center;
      }

      &-arrows {
        display: flex;
        align-items: center;
        padding: 0 1rem;

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

      &-subtitle {
        font-size: 1rem;
        color: ${getColorCarry('neutral_70')};

        &-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
      }

      &-toggle {
        display: flex;
        align-items: center;

        &-label {
          margin-left: 1rem;
          font-weight: 700;
        }
      }
    }

    &__cards {
      display: flex;
      flex-direction: column;
    }

   
  }
`
