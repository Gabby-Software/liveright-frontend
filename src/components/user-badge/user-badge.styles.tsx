import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

function getSize(props: any): string {
  switch (props.$size) {
    case 'sm':
      return '24px'
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
      overflow: hidden;
      color: #fff;
      font-weight: 700;

      & img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11;
      }

      & span {
        line-height: 1.5;
        font-size: inherit;
      }
    }
  }
`
