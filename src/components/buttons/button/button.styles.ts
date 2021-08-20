import { Button, ButtonProps as _ButtonProps } from 'antd'
import styled from 'styled-components'

import { getColor } from '../../../pipes/theme-color.pipe'

interface ButtonProps extends _ButtonProps {
  secondary?: boolean
}

export default styled(Button)<ButtonProps>`
  padding: 11px 36px;
  font-size: 1rem;
  line-height: 1.5rem;
  height: 46px;
  border-radius: 10px;
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

function getBgColor(props: ButtonProps): string {
  return props.secondary ? 'transparent' : getColor(props, 'primary_v2')
}

function getBorderColor(props: ButtonProps): string {
  return getColor(props, props.secondary ? 'link' : 'primary_v2')
}

function getTextColor(props: ButtonProps): string {
  return props.secondary ? getColor(props, 'link') : '#fff'
}
