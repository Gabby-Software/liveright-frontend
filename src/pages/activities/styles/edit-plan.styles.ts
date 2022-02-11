import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem 0;

  @media ${mediaQueries.TABLET} {
    padding-bottom: 0;
  }

  .invalid-field .input__input,
  .invalid-field .input__input:hover,
  .invalid-field .input__input:focus,
  .invalid-field .input__input:focus-within {
    border-color: #ef1733;
  }

  .EditPlan {
    &__overview {
      margin-bottom: 1.25rem;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }

    &__controls {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 1.5rem;

      @media ${mediaQueries.TABLET} {
        display: flex;
        flex-direction: column;
        gap: unset;
      }
    }

    &__input {
      @media ${mediaQueries.TABLET} {
        margin-bottom: 1rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &__invalid {
      & .ant-picker {
        border: 1px solid red;
      }
    }

    &__add-new-day {
      margin: 0 2rem;
      padding: 1rem;
      font-weight: 500;
      font-size: 0.875rem;
      color: ${getColorCarry('neutral_70')};
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23757575' stroke-width='1' stroke-dasharray='6%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      & svg {
        margin-right: 0.5rem;
      }
    }

    &__checkbox {
      margin: 0 0.75rem;

      &-container {
        display: flex;
        align-items: center;
      }
    }
  }
`
