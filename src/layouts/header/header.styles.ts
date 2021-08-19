import styled from 'styled-components'

const height = '100px'
export default styled.header`
  display: block;
  height: ${height};
  .header {
    &__nav {
      position: fixed;
      width: 100%;
      box-sizing: border-box;
      padding: 58px 17px 10px 17px;
      z-index: ${(p) => p.theme.vars.zIndex.header};
      ${(p) => p.theme.extend.flexCenter};
      border-bottom: 1px solid ${(p) => p.theme.vars.colors.inputBorder};
      top: 0;
      left: 0;
      background: white;
    }
    &__placeholder {
      height: ${height};
    }
    &__profile {
      display: block;
      &__img {
        ${(p) => p.theme.extend.flexCenter};
        width: 32px;
        height: 32px;
        border-radius: 40%;
        background-color: ${(p) => p.theme.vars.colors.primary};
        color: white;
        font-size: 12px;
        font-weight: 500;
      }
    }
    &__icon {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      transition: ${(p) => p.theme.vars.defaults.transition};
      position: relative;
      &:not(:last-child) {
        margin-right: 34px;
      }
      &__active {
        color: ${(p) => p.theme.vars.colors.primary};
      }
      svg {
        height: 24px;
        width: auto;
      }
    }
    &__space {
      width: 100%;
    }
    &__title {
      position: absolute;
      font-weight: 500;
      font-size: 18px;
      width: 100%;
      text-align: center;
      margin: 0;
      pointer-events: none;
      touch-action: none;
      padding-bottom: 6px;
    }
  }
`
