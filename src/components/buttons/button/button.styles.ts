import { Button } from 'antd'
import styled from 'styled-components'

import { getColor } from '../../../pipes/theme-color.pipe'
import { getFontSize, getHeight, getPadding } from '../utils.styles'

export default styled(Button)<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${getPadding};
  font-size: ${getFontSize};
  line-height: 1.5rem;
  font-weight: 500;
  height: ${getHeight};
  border-radius: 0.625rem;
  box-shadow: none;
  border: 1px solid ${getBorderColor};
  background-color: ${getBgColor};
  color: ${getTextColor};

  &:hover,
  &:focus {
    background-color: ${getBgColor};
    color: ${getTextColor};
    border-color: ${getBorderColor};
  }
`

function getBgColor(props: any): string {
  switch (props.$var) {
    case 'secondary':
    case 'text':
      return 'transparent'
    default:
      return getColor(props, 'primary_v2')
  }
}

function getBorderColor(props: any): string {
  switch (props.$var) {
    case 'secondary':
      return getColor(props, 'link')
    case 'text':
      return 'transparent'
    default:
      return getColor(props, 'primary_v2')
  }
}

function getTextColor(props: any): string {
  switch (props.$var) {
    case 'secondary':
    case 'text':
      return getColor(props, 'link')
    default:
      return '#fff'
  }
}