import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'
import { getHeight } from '../utils.styles'

export default styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};

  & .ant-picker {
    width: 100%;
    border-radius: 0.625rem;
    padding: 0;
    height: ${getHeight};

    &:hover,
    &.ant-picker-focused {
      border-color: ${getColorCarry('link')};

      & .ant-picker-suffix {
        color: ${getColorCarry('link')};
      }
    }
  }

  & .ant-picker-input {
    height: 100%;
    font-size: 0.875rem;
    color: ${getColorCarry('primaryDark_v2')};
    padding: 0 1rem;
  }

  & .ant-picker-suffix {
    color: ${getColorCarry('dark_v2')};
  }

  & .ant-picker-clear {
    right: 3rem;
    opacity: 1;
  }
`
