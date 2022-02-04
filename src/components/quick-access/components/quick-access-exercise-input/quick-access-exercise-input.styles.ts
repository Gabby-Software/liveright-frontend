import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div<{ disabled?: boolean; fullwidth?: boolean }>`
  .exercise-input {
    &__input-wrapper {
      position: relative;
      width: ${({ fullwidth }) => (fullwidth ? '100%' : '103px')};
      height: 86px;
      background-color: ${({ disabled }) => (disabled ? '#404040' : 'inherit')};
      border: ${({ disabled }) => (disabled ? '' : '1px solid #757575')};
      border-radius: 10px;
      padding: 12px 0;

      input {
        background-color: ${({ disabled }) =>
          disabled ? '#404040' : 'inherit'};
        border: none;
        outline: none;
        color: white;
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
        min-width: 26px;
        max-width: ${({ fullwidth }) => (fullwidth ? 'fit-content' : '38px')};
        display: block;
        margin: 0 auto;
        padding: 0;
        text-align: center;
        &:disabled {
          pointer-events: none;
          color: white;
        }
      }
      label {
        width: fit-content;
        display: block;
        margin: 0 auto;
        color: ${getColorCarry('neutral_50')};
      }
    }

    &__previous-value {
      position: absolute;
      color: ${getColorCarry('neutral_60')};
      left: 35px;
      top: 87px;
    }
  }
`
