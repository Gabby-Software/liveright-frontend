import { Modal } from 'antd'
import styled from 'styled-components'

export default styled(Modal)`
  ${(p) => p.theme.extend.absCover}
  ${(p) => p.theme.extend.flexCenter}
    position: fixed;
  width: 100% !important;
  max-width: none;
  .ant-modal {
    &-content {
      max-width: 80%;
      width: 1248px;
      border-radius: 16px;
    }
    &-body {
      padding: 0;
      text-align: center;
    }
  }
  .small-modal {
    &__title {
      font-size: 14px;
      font-weight: 500;
      padding: 16px;
      border-bottom: 1px solid ${(p) => p.theme.vars.colors.light};
      color: ${(p) => p.theme.vars.colors.primaryDark};
    }
    &__body {
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 500px;
      overflow: auto;
    }
    &__item {
      font-weight: 600;
      font-size: 18px;
      padding: 20px;
      border-bottom: 1px solid ${(p) => p.theme.vars.colors.light};
      cursor: pointer;
      &:hover {
        background-color: light;
      }
      &__default {
        color: ${(p) => p.theme.vars.colors.primaryDark};
      }
      &__primary {
        color: ${(p) => p.theme.vars.colors.primary};
      }
    }
  }
`
