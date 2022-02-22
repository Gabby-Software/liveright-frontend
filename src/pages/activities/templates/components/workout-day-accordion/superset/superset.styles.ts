import styled, { css } from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  border-radius: 15px;
  background-color: ${getColorCarry('neutral_10')};

  .Superset {
    &__exercises {
      padding: 0 0 1rem 0;
    }

    &__actions {
      display: flex;
      align-items: center;
      padding: 0 0 0.5rem 0;
    }

    &__action-btn {
      font-size: 0.75rem;

      & svg {
        margin-right: 0.25rem;
        width: 14px;
        height: 14px;
      }
    }
  }

  ${(props) =>
    props.$isDragging &&
    css`
      border: 1px dashed ${getColorCarry('orange_60')};
      padding: 1rem 1rem 0 1rem;
    `};
`
