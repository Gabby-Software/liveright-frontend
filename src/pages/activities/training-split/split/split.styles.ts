import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem 0;

  @media ${mediaQueries.TABLET} {
    padding-bottom: 0;
  }

  .TrainingSplits {
    &__card {
      @media ${mediaQueries.TABLET} {
        margin-bottom: 1.25rem;
      }
    }

    &__title {
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

    &__filters {
      &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.25rem;

        @media ${mediaQueries.TABLET} {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      &-control {
        width: 225px;

        @media ${mediaQueries.TABLET} {
          width: 100%;
        }
      }

      &-title {
        &-container {
          display: flex;
          align-items: center;

          @media ${mediaQueries.TABLET} {
            width: 100%;
            justify-content: space-between;
          }
        }
      }

      &-actions {
        display: flex;
        align-items: center;

        @media ${mediaQueries.TABLET} {
          padding-top: 1.25rem;
          width: 100%;
        }
      }

      &-make-active-btn {
        margin-left: 1.25rem;
      }
    }

    &__info {
      &-container {
        background-color: ${getColorCarry('neutral_10')};
        margin-bottom: 1.25rem;

        @media ${mediaQueries.TABLET} {
          margin-bottom: 0;
        }
      }

      &-columns {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr minmax(auto, 150px);
        gap: 1rem;
        margin-bottom: 2rem;

        @media ${mediaQueries.TABLET} {
          grid-template-columns: 1fr;
          margin-bottom: 0;
        }
      }

      &-toggle {
        & .toggle__body {
          margin-left: 0;
          margin-right: 1rem;
        }

        &-container {
          display: flex;
          align-items: center;
          font-size: 1rem;
          font-weight: 500;

          @media ${mediaQueries.TABLET} {
            margin-bottom: 1.25rem;
          }
        }
      }

      &-title {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_70')};
      }

      &-value {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_100')};
      }

      &-badge-container {
        display: flex;
      }
    }

    &__cards {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }

    &__card {
      &-container {
        width: 100%;
        max-width: 360px;
      }
    }
  }
`
