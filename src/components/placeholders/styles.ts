import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${(props) => (props.$spacing ? '1.5rem 0' : '0')};
`

export const Text = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${getColorCarry('primaryDark_v2')};
`
