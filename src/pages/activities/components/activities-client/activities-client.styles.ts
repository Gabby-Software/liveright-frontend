import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Wrapper = styled(Card)`
  padding: 1.25rem;
  margin-bottom: 1.875rem;
  color: ${getColorCarry('primaryDark_v2')};
  flex-direction: row;
  justify-content: space-between;

  .log-client {
    &__label {
      font-size: 16px;
      color: ${getColorCarry('secondary2_v2')};
      margin-bottom: 20px;
    }
    &__top {
      display: flex;
      align-items: center;
    }
    &__bottom {
      display: flex;
      align-items: center;
      font-size: 1rem;
      font-weight: 400;
      padding-top: 0.25rem;

      &__item {
        display: flex;
        align-items: center;
      }

      &__separator {
        margin: 0.25rem 1.25rem;
        opacity: 0.8;
        align-self: stretch;
        border-right: 1px solid ${getColorCarry('inputBorder_v2')};
      }
      &__label {
        color: ${getColorCarry('dark_v2')};
        margin-right: 0.5rem;
      }
      &__value {
      }
    }
    &__main {
      flex: 1;
      display: flex;
      align-items: center;
    }
    &__name {
      font-size: 1.125rem;
      font-weight: 700;
    }
    &__switch {
      display: flex;
      align-items: center;
      color: ${getColorCarry('link')};
      padding: 0 0.5rem;
      margin-left: 0.5rem;

      & svg {
        margin-right: 0.5rem;
      }

      & span {
        text-decoration: underline;
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
      border-left: 1px solid ${getColorCarry('inputBorder_v2')};
    }

    &__chat-btn {
      margin-right: 1.25rem;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__expand {
      margin-left: 2.5rem;
      transform-origin: center center;
      cursor: pointer;

      &__open {
        & svg {
          transform: rotate(0.5turn);
          width: 20px;
        }
      }

      & svg {
        transition: ${(p) => p.theme.vars.defaults.transition};
        width: 20px;
      }
    }
  }
`
