import styled from 'styled-components'

import Card from '../../card/card.style'
const cardItemPadding = '19px'
export default styled(Card)`
  ${(p) => p.theme.extend.flexCenter}
  padding: 6px 8px;
  position: relative;
  cursor: pointer;
  .dropdown {
    &__menu {
      position: absolute;
      top: 100%;
      left: 0;
      min-width: 100%;
      margin: 0;
      padding: 14px 0;
      transition: ${(p) => p.theme.vars.defaults.transition};
      opacity: 0;
      transform-origin: top center;
      transform: scaleY(0.95);
      touch-action: none;
      pointer-events: none;
      ul {
        list-style: none;
        margin: 0;
        padding: 6px ${cardItemPadding};
        background-color: white;
        border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
        box-shadow: ${(p) => p.theme.vars.sizes.boxShadow};
      }
    }
    &__item {
      border-bottom: 1px solid ${(p) => p.theme.vars.colors.light};
      a {
        padding: 17px ${cardItemPadding};
        display: block;
        color: ${(p) => p.theme.vars.colors.primaryDark};
        font-size: 14;
        font-weight: 600;
        text-decoration: none;
        background-color: white;
        margin: 0 -${cardItemPadding};
        transition: ${(p) => p.theme.vars.defaults.transition};
        &:hover {
          background-color: ${(p) => p.theme.vars.colors.background};
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
    &__arrow {
      width: 9px;
      color: ${(p) => p.theme.vars.colors.secondary};
      padding: 13px;
      box-sizing: content-box;
    }
  }
  &.dropdown__open {
    .dropdown__menu {
      touch-action: auto;
      pointer-events: auto;
      opacity: 1;
      transform: scaleY(1);
    }
  }
`
