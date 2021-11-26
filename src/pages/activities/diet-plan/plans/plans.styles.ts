import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem 0;

  .DietPlans {
    &__back {
      padding: 0;
      margin-bottom: 1.5rem;
    }

    &__title {
      &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
      }
    }

    &__filters {
      display: flex;
      margin-bottom: 1.5rem;
    }

    &__select {
      width: 200px;
      margin-right: 1.25rem;
    }

    &__table {
      &-link {
        color: ${getColorCarry('link')};
      }
      &-status {
        max-width: 130px;
      }
    }
  }
`
