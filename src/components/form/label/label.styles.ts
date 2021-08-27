import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.label`
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${getColorCarry('secondary2_v2')};
  margin-bottom: 0.25rem;
`
