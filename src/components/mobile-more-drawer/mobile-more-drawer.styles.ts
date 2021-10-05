import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.nav`
  display: block;
  .more {
    &__menu {
      list-style: none;
      padding: 0;
      margin: 0 30px;
    }
    &__item {
      border-bottom: 1px solid ${(p) => p.theme.vars.colors.light2};
      a {
        padding: 17px 15px;
        font-weight: 500;
        font-size: 14px;
        ${(p) => p.theme.extend.flexCenter}
        color: ${(p) => p.theme.vars.colors.primaryDark};
      }
      span {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: ${getColorCarry('neutral_70')};
      }
      svg {
        display: block;
        margin-right: 20px;
        height: 22px;
        width: auto;
      }
      &:last-child {
        padding-bottom: 60px;
      }
    }
    &__label {
      margin-right: auto;
    }
  }
`
