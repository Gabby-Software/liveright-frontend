import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled.button<any>`
  width: 35px;
  height: 35px;
  background-color: ${(props) => (props.$active ? '#6176E1' : '#b0b0b0')};
  border-radius: 9999px;
  border: 0;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 1rem;
  line-height: 1;
  cursor: pointer;

  &::after {
    content: '';
    visibility: ${(props) => (props.$active ? 'visible' : 'hidden')};
    display: block;
    width: 18px;
    height: 18px;
    position: absolute;
    background-color: ${getColorCarry('primary_v2')};
    border-radius: 9999px;
    border: 2px solid #fff;
    right: -0.25rem;
    top: -0.25rem;
  }
`
