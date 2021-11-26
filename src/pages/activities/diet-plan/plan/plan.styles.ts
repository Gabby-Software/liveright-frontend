import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem 0;

  .DietPlan {
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

    &__cards {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.25rem;
    }

    &__info {
      background-color: ${getColorCarry('neutral_20')};
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      &-title {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_70')};
      }

      &-text {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_100')};
      }
    }
  }
`
