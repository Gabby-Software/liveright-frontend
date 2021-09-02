import { Checkbox } from 'antd'
import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled(Checkbox)`
  & .ant-checkbox-inner {
    border-color: ${getColorCarry('primary_v2')};
    border-radius: 4px;
  }

  & .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${getColorCarry('primary_v2')};
  }

  & .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${getColorCarry('primary_v2')};
  }

  .ant-checkbox-checked::after {
    border-color: ${getColorCarry('primary_v2')};
    border-radius: 4px;
  }

  & .ant-checkbox:hover {
    .ant-checkbox-inner {
      border-color: ${getColorCarry('primary_v2')};
    }
  }

  &.ant-checkbox-wrapper:hover {
    .ant-checkbox-inner {
      border-color: ${getColorCarry('primary_v2')};
    }
  }
`
