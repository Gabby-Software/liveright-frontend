import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'
import { getShadow } from '../../pipes/theme-shadow.pipe'

export default styled.div`
  background-color: ${getColorCarry('background')};
  height: 77px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  display: flex;
  z-index: ${(p) => p.theme.vars.zIndex.footer};
  box-shadow: ${getShadow('primary')};

  .mobile-footer {
    &__cont {
      display: flex;
      width: 100%;
    }

    &__item {
      width: 100%;
      color: ${getColorCarry('dark_v2')};
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;
      position: relative;
      font-size: 0.75rem;
      padding: 1rem 0;

      svg {
        height: 22px;
        width: 30px;
        display: block;
        margin: 0 auto 0.625rem auto;
      }

      &__active {
        color: ${getColorCarry('primaryDark')};

        &:before {
          ${(p) => p.theme.extend.pseudo}
          height: 3px;
          max-width: 42px;
          left: 0;
          right: 0;
          margin: auto;
          top: 0;
          background-color: ${getColorCarry('primaryDark')};
          border-radius: 0 0 1.5px 1.5px;
        }
      }
    }
    &__add {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      & div {
        width: 46px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${getColorCarry('primary_v2')};
        color: #fff;
        border-radius: 8px;
        cursor: pointer;

        & svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`
