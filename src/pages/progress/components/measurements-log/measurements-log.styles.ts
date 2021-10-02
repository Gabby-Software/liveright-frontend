import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  width: 100%;
  padding-bottom: 3rem;

  .log-measurements {
    &__title {
      margin-bottom: 1.875rem;
    }

    &__submit {
      width: 100%;
    }

    &__forms {
      margin-bottom: 1.875rem;
    }

    &__fields {
      width: 100%;
    }

    &__field {
      margin-bottom: 1.25rem;
    }

    &__toggle-row {
      display: flex;
      align-items: center;

      & .toggle__body {
        margin-left: 0;
      }
    }

    &__toggle-label {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_70')};
      margin-left: 0.625rem;
    }

    &__toggle-container {
      margin-bottom: 1.875rem;
    }

    &__goals-form {
      padding-top: 1.875rem;
    }
  }
`
