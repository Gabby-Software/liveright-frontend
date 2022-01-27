import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &.not-allowed {
    cursor: not-allowed;
  }

  .toggle {
    &__label {
      font-size: 1.125rem;
      color: ${getColorCarry('dark_v2')};
    }

    &__body {
      position: relative;
      border-radius: 10px;
      width: 40px;
      height: 20px;
      flex-shrink: 0;
      margin-left: 22px;
      transition: ${(p) => p.theme.vars.defaults.transition};

      &:before {
        ${(p) => p.theme.extend.pseudo}
        transition: ${(p) => p.theme.vars.defaults.transition};
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: white;
        top: 0;
        bottom: 0;
        margin: auto;
      }
      &__off {
        background-color: ${getColorCarry('secondary')};

        &:before {
          left: 2px;
        }
        &:hover {
          background-color: ${getColorCarry('secondary')};
        }
      }
      &__on {
        background-color: ${getColorCarry('primary_v2')};

        &:before {
          left: calc(100% - 18px);
        }
        &:hover {
          background-color: ${getColorCarry('primary_v2')};
        }
      }
    }
  }
`
