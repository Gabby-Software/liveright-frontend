import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const Text = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${getColorCarry('primaryDark_v2')};
`
