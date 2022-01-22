import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  color: ${getColorCarry('neutral_100')};
  padding: 2rem 0;

  @media ${mediaQueries.TABLET} {
    padding-bottom: 0;
  }

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

      @media ${mediaQueries.TABLET} {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.25rem;
      }
    }

    &__badge {
      margin-right: 1.25rem;

      @media ${mediaQueries.TABLET} {
        margin-right: 0;
      }

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

        @media ${mediaQueries.TABLET} {
        }
      }
    }

    &__day {
      &-title {
        display: flex;
        align-items: center;

        @media ${mediaQueries.TABLET} {
          justify-content: space-between;
        }
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

        @media ${mediaQueries.TABLET} {
          margin-bottom: 1rem;
        }

        &-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;

          @media ${mediaQueries.TABLET} {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      }

      &-toggle {
        display: flex;
        align-items: center;

        &-label {
          margin-left: 1rem;
          font-weight: 700;
        }

        @media ${mediaQueries.TABLET} {
          & .toggle__body {
            margin-left: 0;
          }
        }
      }
    }

    &__cards {
      display: flex;
      flex-direction: column;
    }
  }
`
