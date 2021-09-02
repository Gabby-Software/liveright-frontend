import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export const FooterInvisible = styled.div<any>`
  width: calc(100vw - 210px);
  position: fixed;
  left: 210px;
  bottom: 0;
  height: 89px;
  background-color: #fff;
  border-top: 1px solid ${getColorCarry('secondary2')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  transition: 0.25s ease-out;
  transform: translateX(${(props) => (props.$open ? '0px' : '-100vw')});
  z-index: 79;

  .footer {
    &__action {
      margin-right: 1rem;
      color: ${getColorCarry('primaryDark2_v2')};
      border-color: ${getColorCarry('neutral_50')};
      font-weight: 500;

      &_primary {
        color: ${getColorCarry('primary_v2')};
        border-color: ${getColorCarry('primary_v2')};
      }
    }

    &__action-close {
      color: ${getColorCarry('primaryDark2_v2')};
      border: 1px solid ${getColorCarry('neutral_50')};
    }

    &__action-divider {
      width: 1px;
      height: 38px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-right: 1rem;
    }

    &__actions-container {
      display: flex;
      align-items: center;
    }
  }
`

export const FooterVisible = styled.div`
  width: 210px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid ${getColorCarry('secondary2')};
  border-right: 1px solid ${getColorCarry('secondary2')};
  z-index: 80;

  .footer {
    &__user-card {
      border-radius: 0;
      background: #fff;
      height: 88px;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      & .user-badge-card__subtitle {
        font-size: 0.75rem;
      }

      & .user-badge-card__content {
        padding-left: 0.625rem;
      }

      & svg {
        transform: translateY(-0.5rem);
      }
    }
  }
`
