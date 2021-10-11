import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  .log-measurements {
    &__card {
      background-color: ${getColorCarry('secondary3_v2')};
      margin-bottom: 1.25rem;
    }

    &__submit {
      width: 100%;
    }

    &__title {
      text-align: center;
      font-size: 1rem;
      font-weight: 500;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 1.25rem;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & span {
        font-size: 2rem;
      }
    }

    &__input {
      width: 100px;

      & .input__input {
        height: 70px;
        text-align: center;
        font-size: 1.125rem;
        color: ${getColorCarry('primaryDark_v2')};
      }

      & .input__label {
        text-align: center;
        display: flex;
        justify-content: center;
        color: ${getColorCarry('primaryDark_v2')};
        margin-bottom: 0.5rem;
      }
    }
  }
`
