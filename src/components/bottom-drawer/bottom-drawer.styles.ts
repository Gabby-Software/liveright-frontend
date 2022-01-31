import { Drawer } from 'antd'
import styled from 'styled-components'

export default styled(Drawer)<{ isLogDrawer?: boolean }>`
  --top: 0;
  .ant-drawer-content-wrapper {
    bottom: var(--top);
  }
  .ant-drawer-content {
    border-radius: 20px 20px 0 0;
  }
  .ant-drawer-body {
    padding: 0;
  }
  .ant-drawer-mask {
    background-color: rgba(0, 0, 0, 0.7);
  }
  .drawer {
    &__wrapper {
      display: flex;
      flex-direction: column;
      max-height: 80vh;
    }
    &__header {
      position: relative;
      padding: ${({ isLogDrawer }) =>
        isLogDrawer ? '16px' : '34px 24px 14px 24px'};
      &:before {
        ${(p) => p.theme.extend.pseudo}
        left:0;
        right: 0;
        height: 4px;
        width: 68px;
        background-color: #ededed;
        top: 14px;
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
      opacity: 0.7;
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
