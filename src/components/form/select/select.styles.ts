import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'
import { getHeight } from '../utils.styles'

export default styled.div<any>`
  width: 100%;
  flex-direction: column;
  display: flex;

  & .select__input {
    &.ant-select-focused.ant-select {
      & .ant-select-selector {
        border-color: ${getColorCarry('link')};
      }
    }

    & .ant-select-selector {
      height: ${getHeight};
      border-radius: 0.625rem;
      border-color: ${getColorCarry('inputBorder_v2')};
      font-size: 0.875rem;
      color: ${getColorCarry('primaryDark_v2')};
      padding: 0 1rem;

      &:hover {
        border-color: ${getColorCarry('link')};
      }
    }

    & .ant-select-selection-search {
      display: flex;
      align-items: center;
    }

    & .ant-select-selection-placeholder {
      display: flex;
      align-items: center;
    }

    & .ant-select-selection-item {
      display: flex;
      align-items: center;
    }

    & .ant-select-arrow {
      right: 1rem;
      color: ${getColorCarry('dark_v2')};
    }
  }
`
