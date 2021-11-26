import styled, { css } from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  border-radius: 15px;
  background-color: ${getColorCarry('neutral_20')};

  .Superset {
    &__exercises {
      padding: 0 0 1rem 0;
    }
  }

  ${(props) =>
    props.$isDragging &&
    css`
      border: 1px dashed ${getColorCarry('orange_60')};
      padding: 1rem 1rem 0 1rem;
    `};
`
