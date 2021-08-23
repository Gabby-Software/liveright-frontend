import { Button } from 'antd'
import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'
import { getFontSize, getHeight } from '../utils.styles'

export default styled(Button)<any>`
  padding: ${getPadding};
  font-size: ${getFontSize};
  height: ${getHeight};
  border-radius: 0.625rem;
  box-shadow: none;
  background-color: transparent;
  color: ${getColorCarry('primaryDark_v2')};
  border-color: ${getColorCarry('primaryDark_v2')};
  border-width: 0;
  display: flex;
  align-items: center;

  &:hover,
  &:focus {
    background-color: ${getColorCarry('light')};
    color: ${getColorCarry('primaryDark_v2')};
    border-color: ${getColorCarry('primaryDark_v2')};
  }
`

function getPadding(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '8px 8px'
    default:
      return '11px 11px'
  }
}
