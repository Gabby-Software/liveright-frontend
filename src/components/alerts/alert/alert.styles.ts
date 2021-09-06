import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 38px;
  background-color: rgba(255, 153, 0, 0.05);
  border: 1px dashed ${getColorCarry('orange_90')};
  color: ${getColorCarry('orange_90')};
  padding: 0.625rem 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  border-radius: 10px;

  & svg {
    margin-right: 1rem;
    min-width: 15px;
  }
`
