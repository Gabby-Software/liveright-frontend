import { Drawer } from 'antd'
import styled from 'styled-components'

export default styled(Drawer)`
  --top: 0;
  .ant-drawer-content-wrapper {
    bottom: var(--top);
  }
  .ant-drawer-body {
    padding: 0;
  }
  .drawer {
    &__wrapper {
      display: flex;
      flex-direction: column;
      max-height: 80vh;
    }
    &__header {
      position: relative;
      padding: 53px 24px 16px 24px;
      border-bottom: 1px solid ${(p) => p.theme.vars.colors.light2};
      &:before {
        ${(p) => p.theme.extend.pseudo}
        left:0;
        right: 0;
        height: 5px;
        width: 96px;
        background-color: ${(p) => p.theme.vars.colors.light2};
        top: 6px;
        margin: auto;
      }
    }
    &__top-back {
      position: absolute;
      left: 24px;
      top: 0px;
      opacity: 0.5;
      height: 1rem;
      cursor: pointer;
    }
    &__back {
      position: absolute;
      left: 24px;
      bottom: 19px;
      opacity: 0.5;
      height: 1rem;
      cursor: pointer;
    }
    &__title {
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      text-align: center;
    }
  }
`
