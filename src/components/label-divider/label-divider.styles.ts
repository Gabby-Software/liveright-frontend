import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

interface LabelDividerProps {
  fontWeight?: number
  fontSize?: string | number
  color?: string
}
export const LabelDivider = styled.p<LabelDividerProps>`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  font-size: ${(props) => props.fontSize ?? '1rem'};
  font-weight: ${(props) => props.fontWeight ?? 400};
  color: ${(props) => props.color ?? getColorCarry('primaryDark_v2')};
  margin: 1.25rem 0;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${getColorCarry('inputBorder_v2')};
    margin-left: 1.25rem;
  }
`
