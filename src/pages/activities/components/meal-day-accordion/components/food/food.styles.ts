import styled, { css } from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  display: grid;
  grid-template-columns: 46px 3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 46px;
  gap: 1rem;
  padding: 0.5rem 0 0.75rem 0;
  background-color: ${getColorCarry('neutral_10')};
  border-radius: 15px;

  .invalid-field .ant-select-selector,
  .invalid-field .input__input,
  .invalid-field .input__input:hover,
  .invalid-field .input__input:focus,
  .invalid-field .input__input:focus-within {
    border-color: #ef1733;
  }

  ${(props) =>
    props.$isDragging &&
    css`
      border: 1px dashed ${getColorCarry('orange_60')};
    `};

  & label {
    white-space: nowrap;
  }

  .Food {
    &__delete {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;

      &-btn {
        color: ${getColorCarry('red')};
      }
    }

    &__drag {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &-btn {
        height: 44px;
        width: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: transparent;
        border: 0;
        color: ${getColorCarry('secondary2_v2')};
      }
    }
  }
`
