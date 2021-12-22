import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  width: 100%;
  height: 480px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background-color: white;

  padding: ${(props) => (props.$spacing ? '1.5rem 0' : '0')};

  & .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }
`

export const Text = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${getColorCarry('primaryDark_v2')};
`
