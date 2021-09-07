import { Button } from 'antd'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColor } from '../../../pipes/theme-color.pipe'
import {
  getFontSize,
  getHeight,
  getMobilePadding,
  getPadding
} from '../utils.styles'

export const Link = styled(RouterLink)`
  display: block;
  width: max-content;
`

export const Styles = styled(Button)<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${getPadding};
  font-size: ${getFontSize};
  line-height: 1.5rem;
  font-weight: ${getFontWeight};
  height: ${getHeight};
  border-radius: 0.625rem;
  box-shadow: none;
  border: 1px solid ${getBorderColor};
  background-color: ${getBgColor};
  color: ${getTextColor};

  &:disabled {
    border: 1px solid ${getBorderColor};
    background-color: ${getBgColor};
    color: ${getTextColor};
    opacity: 0.75;

    &:hover,
    &:focus {
      background-color: ${getBgColor};
      color: ${getTextColor};
      border-color: ${getBorderColor};
    }
  }

  &:hover,
  &:focus {
    background-color: ${getBgColor};
    color: ${getTextColor};
    border-color: ${getBorderColor};
  }

  @media (${mediaQueries.MOBILE}) {
    padding: ${getMobilePadding};
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

function getFontWeight(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '400'
    default:
      return '500'
  }
}
