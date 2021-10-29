import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export const FooterInvisible = styled.div<any>`
  width: calc(100vw - 220px);
  position: fixed;
  left: 220px;
  bottom: 0;
  height: 89px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  transition: 0.25s ease-out;
  transform: translateX(${(props) => (props.$open ? '0px' : '-100vw')});
  z-index: 112;

  @media only print {
    display: none;
  }

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
  width: 220px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #22545a;
  border-right: 1px solid ${getColorCarry('secondary2')};
  background-color: #fff;
  z-index: 113;

  @media only print {
    display: none;
  }

  .footer {
    &__user-card {
      border-radius: 0;
      height: 88px;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      & .user-badge-card__title {
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
      }

      & .user-badge-card__subtitle {
        font-size: 0.75rem;
      }

      & .user-badge-card__content {
        color: #ffffff;
      }

      & svg {
        stroke: black;
        transform: translateY(-0.5rem);
      }
    }
  }
`

export const TrainerFooterInvisible = styled(FooterInvisible)<any>`
  box-shadow: 0px -5px 40px rgba(63, 201, 173, 0.2);

  .footer {
    &__action {
      border: 1px solid #2ba8b6;
      box-sizing: border-box;
      border-radius: 10px;
      color: #2ba8b6;
      svg {
        margin-right: 16px;
        stroke: #2ba8b6;
      }

      &_primary {
        color: ${getColorCarry('white')};
        background: #2ba8b6;
      }
    }
  }
`
export const TrainerFooterVisible = styled(FooterVisible)<any>`
    background: #00363c;
  .footer {
    &__user-card {
      & .user-badge-card__title {
        color: #ffffff;
      }
       & .user-badge-card__subtitle {
        color: #b7dbdf;
      }
       & svg {
        stroke: #ffffff;;
      }
`
