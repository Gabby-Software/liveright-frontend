import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.5rem 0;
  margin: 0 -20px;
  background-color: ${getColorCarry('primaryDark_v2')};
`
