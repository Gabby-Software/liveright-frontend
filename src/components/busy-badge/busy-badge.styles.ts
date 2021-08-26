import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  width: 100%;
  padding: 1rem;
  color: ${getColorCarry('orange_90')};
  border: 1px dashed ${getColorCarry('orange_90')};
  background-color: #ff99000d;
  line-height: 1;
  display: flex;
  align-items: center;
  border-radius: 10px;
  height: 38px;

  & svg {
    margin-right: 1rem;
  }
`
