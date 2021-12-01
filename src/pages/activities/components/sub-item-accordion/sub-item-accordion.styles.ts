import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div<any>`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};

  &:last-child {
    border-bottom: 0;
  }

  .SubItemAccordion {
    &__summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 0;
    }

    &__title {
      font-size: 0.875rem;
      font-weight: 500;

      &-container {
        display: flex;
        align-items: center;
      }
    }

    &__drag {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      background-color: transparent;
      border: 0;
      cursor: pointer;
      margin-right: 0.5rem;
      color: ${getColorCarry('neutral_70')};
    }

    &__caret {
      width: 34px;
      display: flex;
      align-items: center;
      justify-content: center;

      & svg {
        transform: ${(props: any) => (props.$open ? 'rotate(180deg)' : 'none')};
      }
    }

    &__actions {
      display: flex;
      align-items: center;
    }

    &__delete {
      color: ${getColorCarry('red')};
      width: 34px;
      display: flex;
      align-items: center;
      justify-content: center;

      & svg {
        width: 18px;
        height: 18px;
      }
    }

    &__content {
      padding-bottom: 1.25rem;
    }
  }
`
