import styled from 'styled-components'

import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem;

  .TSTemplates {
    &__topbar {
      display: flex;
      justify-content: space-between;
      padding: 0;
      font-size: 0.875rem;
      margin-bottom: 2rem;

      &-back {
        color: ${getColorCarry('link')};
        padding: 0;
      }

      &-delete {
        color: ${getColorCarry('red')};
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

    &__info {
      &-container {
        background-color: ${getColorCarry('neutral_10')};
        padding: 1.5rem 2rem;
        margin-bottom: 1.25rem;
        display: flex;
        border-radius: 10px;
      }

      &-column {
        text-align: center;
      }

      &-title {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_70')};
      }

      &-value {
        font-size: 0.875rem;
        font-weight: 400;
        padding: 0.5rem 2rem;
        background-color: ${getColorCarry('neutral_30')};
        color: ${getColorCarry('neutral_100')};
        border-radius: 8px;
      }

      &-toggle-container {
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-weight: 500;
        margin: 1.25rem 0;

        & .toggle__body {
          margin-left: 0;
          margin-right: 1rem;
        }
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
