import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem 0;

  .training-plan {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 3rem;

      &-actions {
        display: flex;
      }

      &-btn {
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
      }

      &-select {
        width: 225px;
      }
    }

    &__alert {
      display: flex;
      align-items: center;
      background-color: rgba(228, 154, 10, 0.05);
      border: 1px solid #e49a0a;
      padding: 1.25rem 1.875rem;
      border-radius: 10px;
      color: #10243d;
      margin-bottom: 1.25rem;

      &-body {
        display: flex;
        align-items: center;
      }

      &-icon {
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e49a0a;
        border-radius: 9999px;
        color: #fff;
        margin-right: 1.25rem;
      }

      &-action {
        background-color: transparent;
        border: 0;
        text-decoration: underline;
        color: #e49a0a;
        cursor: pointer;
        margin: 0 0.25rem;
      }
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 1.25rem;
    }

    &__badges {
      display: flex;
      margin-bottom: 1.875rem;
    }

    &__badge {
      margin-right: 3rem;

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
  }
`
