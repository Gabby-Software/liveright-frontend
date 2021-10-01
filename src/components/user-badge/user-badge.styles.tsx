import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

function getSize(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '24px'
    case 'md':
      return '42px'
    case 'lg':
      return '50px'
    case 'xl':
      return '60px'
    default:
      return '36px'
  }
}

function getFontSize(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '0.625rem'
    case 'lg':
    case 'md':
      return '1rem'
    case 'xl':
      return '1.25rem'
    default:
      return '0.75rem'
  }
}

function getTextSize(props: any): string {
  switch (props.$size) {
    case 'lg':
    case 'md':
      return '1rem'
    case 'xl':
      return '1.25rem'
    default:
      return '0.875rem'
  }
}

function geTextWeight(props: any): string {
  switch (props.$weight) {
    case 'semi-bold':
      return '500'
    default:
      return '400'
  }
}

function getOnlinePosition(props: any): string {
  if (props.$square) {
    return '-2px'
  }
  switch (props.$size) {
    case 'lg':
      return '2px'
    case 'xl':
      return '4px'
    default:
      return '1px'
  }
}

export const Text = styled.span<any>`
  font-size: ${getTextSize};
  font-weight: ${geTextWeight};
  color: ${getColorCarry('primaryDark_v2')};
`

export const Styles = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: center;

  .user-badge {
    &__preview {
      margin-right: 0.75rem;
      position: relative;
      width: ${getSize};
      height: ${getSize};
      min-width: ${getSize};
      min-height: ${getSize};
      background-color: ${getColorCarry('primary_v2')};
      border-radius: ${(props) => (props.$square ? '10px' : '9999px')};
      font-size: ${getFontSize};
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-weight: 700;

      &::after {
        content: '';
        display: ${(props) => (props.$online ? 'block' : 'none')};
        width: 10px;
        height: 10px;
        border-radius: 9999px;
        position: absolute;
        top: ${getOnlinePosition};
        right: ${getOnlinePosition};
        background-color: ${getColorCarry('green_90')};
        z-index: 12;
        border: 1px solid ${getColorCarry('inputBorder_v2')};
      }

      & img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11;
        border-radius: ${(props) => (props.$square ? '10px' : '9999px')};
      }

      & span {
        line-height: 1.5;
        font-size: inherit;
      }
    }

    &__unread {
      position: absolute;
      width: 20px;
      height: 20px;
      top: -5px;
      right: -5px;
      z-index: 13;
      background-color: ${getColorCarry('primary_v2')};
      border: 1px solid ${getColorCarry('white')};
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
