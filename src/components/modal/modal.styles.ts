import { Modal } from 'antd'
import styled from 'styled-components'

export default styled(Modal)`
  &.modal__large {
    width: 1100px !important;
    max-width: 100%;
  }
  .ant-modal {
    &-close {
      padding: 12px;
      svg {
        width: 18px;
        height: 18px;
        color: ${(p) => p.theme.vars.colors.primaryDark};
      }
    }
  }
  @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    top: 0;
    padding-bottom: 0;
    width: 100% !important;
    max-width: 100%;
    margin: 0;
    .ant-modal {
      &-content {
        height: 100vh;
        overflow: auto;
      }
    }
  }
`
