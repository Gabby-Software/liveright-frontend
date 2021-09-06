import styled from 'styled-components'

export default styled.div`
  position: relative;
  .btn-dropdown {
    &__button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 11px 20px;
      font-weight: 400;
      transition: ${(p) => p.theme.vars.defaults.transition};
      &__text {
      }
      &__icon {
        height: 5px;
        width: auto;
        transform-origin: center center;
      }
      &__open {
        border-radius: 10px 10px 0 0;
        .btn-dropdown {
          &__icon {
            transform: rotate(180deg);
          }
        }
      }
    }
    &__menu {
      style-type: none;
      padding: 0;
      margin: 0;
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      border-radius: 0 0 10px 10px;
      background-color: white;
      overflow: hidden;
      z-index: 5;
      transition: ${(p) => p.theme.vars.defaults.transition};
      box-shadow: none;
      transform: scaleY(0);
      transform-origin: top center;
      &__item {
        padding: 10px 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        border-bottom: 1px solid ${(p) => p.theme.vars.colors.inputBorder_v2};
        &:last-child {
          border-bottom: none;
        }
      }
      &__open {
        box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.25);
        transform: scaleY(1);
      }
    }
  }
`
