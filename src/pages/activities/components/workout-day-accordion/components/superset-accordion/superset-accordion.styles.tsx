import styled, { css } from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  display: flex;
  flex-direction: column;

  .SupersetAccordion {
    &__bar {
      display: flex;
      align-items: center;

      & > svg {
        margin-left: 0.5rem;
        margin-top: 1rem;
        color: red;
      }
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
