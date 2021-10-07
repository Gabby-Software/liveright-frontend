import { Radio } from 'antd'
import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled(Radio)`
  &.ant-radio-wrapper .ant-radio {
    margin-right: 8px;
  }

  & .ant-radio-input:focus + .ant-radio-inner {
    border-color: ${getColorCarry('primary_v2')};
  }

  & .ant-radio-checked .ant-radio-inner::after {
    background-color: transparent;
  }

  & .ant-radio-checked .ant-radio-inner {
    border-color: ${getColorCarry('primary_v2')};
    border-width: 4px;
  }

  & .ant-radio:hover {
    .ant-radio-inner {
      border-color: ${getColorCarry('primary_v2')};
    }
  }

  &.ant-radio-wrapper:hover {
    .ant-radio-inner {
      border-color: ${getColorCarry('primary_v2')};
    }
  }
`
