import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;

  .AddTrainingSplit {
    &__card {
      margin-bottom: 1.25rem;
      &:last-child {
        margin-bottom: 0;
      }
    }

    &__back {
      margin-bottom: 0.75rem;
    }

    &__title {
      &-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }
    }

    &__subtitle {
      margin-bottom: 1.5rem;
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 1.5rem;
    }

    &__name-controls {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }

    &__info-controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.25rem;
    }

    &__link {
      &-title {
        margin-bottom: 0.5rem;
      }

      &-text {
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        color: ${getColorCarry('neutral_70')};
        max-width: 600px;
        width: 100%;
      }

      &-controls {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1.25rem;
      }
    }

    &__card-add {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      border: 1px dashed ${getColorCarry('link')};
      color: ${getColorCarry('link')};
      border-radius: 10px;
      cursor: pointer;
      padding: 1rem 0;

      & svg {
        width: 30px;
        height: 30px;
      }
    }

    &__cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, 360px);
      gap: 1.25rem;
      margin-bottom: 1.5rem;
      //margin: -0.75rem;

      &-title {
        margin-bottom: 0;

        &-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
      }

      &-toggle {
        margin: 0 1.25rem;

        & .toggle__body {
          margin: 0;
        }

        &-container {
          display: flex;
          align-items: center;
        }

        &-label {
          font-size: 0.875rem;
          font-weight: 400;
          color: ${getColorCarry('neutral_70')};
        }
      }

      &-checkbox {
        margin-right: 0.5rem;

        &-container {
          display: flex;
          align-items: center;
        }

        &-label {
          margin-bottom: 0;
        }
      }
    }
  }
`
