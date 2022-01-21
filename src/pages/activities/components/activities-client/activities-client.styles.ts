import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Wrapper = styled(Card)`
  padding: 1.25rem;
  margin-bottom: 1.875rem;
  color: ${getColorCarry('primaryDark_v2')};
  flex-direction: row;
  justify-content: space-between;

  @media ${mediaQueries.MOBILE} {
    padding: 1rem;
    flex-direction: column;
    margin-top: -5rem;
  }

  .log-client {
    &__label {
      font-size: 16px;
      color: ${getColorCarry('secondary2_v2')};
      margin-bottom: 20px;
    }
    &__top {
      display: flex;
      align-items: center;

      @media ${mediaQueries.MOBILE} {
        flex-direction: column;
        align-items: flex-start;
      }
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

        @media ${mediaQueries.MOBILE} {
          flex-direction: column;
          align-items: flex-start;
          width: 50%;
        }
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

      @media ${mediaQueries.MOBILE} {
        font-size: 14px;
        background: rgba(9, 72, 79, 0.03);
        border-radius: 10px;
        padding: 0.5rem 1rem;
        margin-top: 10px;
      }
    }
    &__main {
      flex: 1;
      display: flex;
      align-items: center;

      @media ${mediaQueries.MOBILE} {
        justify-content: space-between;
      }
    }
    &__name {
      font-size: 1.125rem;
      font-weight: 700;

      @media ${mediaQueries.MOBILE} {
        font-size: 1rem;
      }
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

      @media ${mediaQueries.MOBILE} {
        margin: 0;
        padding: 0;
      }
    }

    &__user-container {
      display: flex;
      align-items: center;
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
