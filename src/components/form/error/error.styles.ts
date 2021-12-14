import styled, { css } from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.p<any>`
  color: ${getColorCarry('red')};
  font-size: 0.75rem;

  ${(props) =>
    !props.$standalone &&
    css`
      position: absolute;
      bottom: -1.125rem;
      left: 0;

      ${props.$size === 'sm' &&
      css`
        bottom: -1rem;
      `}
    `}

  ${(props) =>
    props.$size === 'sm' &&
    css`
      font-size: 0.5rem;
    `}
`
