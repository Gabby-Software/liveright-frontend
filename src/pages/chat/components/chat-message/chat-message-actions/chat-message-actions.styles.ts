import styled from 'styled-components'

import { media } from '../../../../../assets/styles/_media'

export default styled.div`
  cursor: pointer;
  position: relative;
  svg {
    height: 5px;
    color: ${(p) => p.theme.vars.colors.secondary2_v2};
    display: block;
    margin-top: 3px;
  }
  &.popup {
    display: none;
  }
  .msg-actions {
    &__menu {
      list-style: none;
      padding: 0;
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      background-color: white;
      border-radius: 0 10px 10px 10px;
      transform: scale(0);
      transform-origin: top left;
      transition: ${(p) => p.theme.vars.defaults.transition};
      box-shadow: none;
      &:hover {
        background-color: #fafafa;
      }
      &__open {
        box-shadow: 0px 4px 29px rgba(213, 222, 232, 0.55);
        transform: scale(1);
        z-index: 3;
      }
    }
    &__item {
      color: ${(p) => p.theme.vars.colors.primaryDark_v2};
      padding: 22px 30px;
      cursor: pointer;
    }
  }
  &.me {
    margin-left: auto;
    .msg-actions {
      &__menu {
        left: auto;
        right: 0;
        border-radius: 10px 0 10px 10px;
        transform-origin: top right;
      }
      &__item {
      }
    }
  }
  ${media('tablet', 'max')`
    margin: 3px 4px 0 4px;
    order:1;
    &.me {order:0}
`}
`
