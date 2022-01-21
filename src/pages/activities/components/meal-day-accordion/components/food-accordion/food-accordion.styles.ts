import styled, { css } from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  display: flex;
  flex-direction: column;

  .invalid-field .ant-select-selector,
  .invalid-field .input__input,
  .invalid-field .input__input:hover,
  .invalid-field .input__input:focus,
  .invalid-field .input__input:focus-within {
    border-color: #ef1733;
  }

  .FoodAccordion {
    &__control {
      margin-bottom: 1rem;
    }

    &__controls {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }

    &__checkbox {
      margin: 0 0.75rem;

      &-container {
        display: flex;
        align-items: center;
        margin-top: 0.5rem;
      }
    }
  }

  ${(props) =>
    props.$isDragging &&
    css`
      border: 1px dashed ${getColorCarry('orange_60')};
      padding: 1rem 1rem 0 1rem;
    `};
`
