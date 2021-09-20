import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const TooltipContainer = styled.div`
  background-color: #fff;
  padding: 0.5rem;
  border: 1px solid ${getColorCarry('inputBorder_v2')};
`
