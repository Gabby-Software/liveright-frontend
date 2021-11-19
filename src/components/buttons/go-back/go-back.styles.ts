import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.p<any>`
  display: flex;
  align-items: center;
  color: ${getColorCarry('link')};
  cursor: pointer;
  margin-bottom: ${(props) =>
    props.$spacing ? `${props.$spacing * 0.25}rem` : 0};
`
