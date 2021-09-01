import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.p`
  position: absolute;
  bottom: -1rem;
  left: 0;
  color: ${getColorCarry('primary_v2')};
  font-size: 0.75rem;
`
