import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

const Hr = styled.div`
  border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};
`
export default Hr
