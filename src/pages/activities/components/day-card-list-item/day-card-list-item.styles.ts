import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 0.125rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${getColorCarry('secondary2_v2')};
  font-size: 0.875rem;
`
