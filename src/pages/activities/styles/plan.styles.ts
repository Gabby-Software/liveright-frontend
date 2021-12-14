import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;

  @media ${mediaQueries.TABLET} {
    padding-bottom: 0;
  }

  .topbar {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    font-size: 0.875rem;

    &-back {
      color: ${getColorCarry('link')};
      padding: 0;
    }

    &-delete {
      color: ${getColorCarry('red')};
    }
  }

  .PlanPage {
    &__card {
      @media ${mediaQueries.TABLET} {
        margin-bottom: 1.875rem;
      }
    }

    &__subtitle {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 1.25rem;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;

      &-actions {
        display: flex;
      }

      & button,
      & a {
        margin-right: 1.25rem;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    &__filters {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;

      &-title {
        margin-right: 1.875rem;

        @media ${mediaQueries.TABLET} {
          margin-right: 0.25rem;
        }

        &-container {
          @media ${mediaQueries.TABLET} {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.25rem;
          }
        }
      }

      &-archived-btn {
        padding: 0;
      }

      &-select {
        width: 225px;

        @media ${mediaQueries.TABLET} {
          width: 100%;
        }
      }

      &-actions {
        display: flex;
        align-items: center;

        @media ${mediaQueries.TABLET} {
          width: 100%;
        }
      }

      &-make-active-btn {
        margin-left: 1.25rem;
      }

      @media ${mediaQueries.TABLET} {
        flex-direction: column;
      }
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 2rem;
    }

    &__badges {
      display: flex;
      margin-bottom: 1.875rem;

      @media ${mediaQueries.TABLET} {
        background-color: ${getColorCarry('neutral_10')};
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        margin-bottom: 0;
      }
    }

    &__badge {
      margin-right: 3rem;

      @media ${mediaQueries.TABLET} {
        margin-right: 0;
        margin-bottom: 1.25rem;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &-badge {
        width: fit-content;
      }

      &-title {
        margin-bottom: 0.25rem;
        font-size: 0.875rem;
        color: ${getColorCarry('secondary2_v2')};
      }

      &-text {
        min-height: 36px;
      }
    }

    &__cards {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.25rem;
    }

    &__info {
      background-color: ${getColorCarry('neutral_10')};
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      @media ${mediaQueries.TABLET} {
        align-items: flex-start;
        flex-direction: column-reverse;
        margin-bottom: 0;
      }

      &-title {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_70')};
      }

      &-text {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_70')};
      }

      &-badge {
        @media ${mediaQueries.TABLET} {
          margin-bottom: 1rem;
        }
      }
    }

    &__summary {
      margin-bottom: 1.5rem;

      & .label {
        color: ${getColorCarry('neutral_70')};
        margin: 0.5rem 0;
      }

      & .nutrients {
        display: flex;
        gap: 4px;
      }

      & .food-description {
        margin: 1.5rem 0;
        color: ${getColorCarry('neutral_100')};
      }

      & .foods {
        color: ${getColorCarry('neutral_70')};
      }
    }

    &__content {
      background: ${getColorCarry('neutral_10')};
      border-radius: 10px;

      & .table {
        padding: 1.5rem;
      }
    }
  }
`
