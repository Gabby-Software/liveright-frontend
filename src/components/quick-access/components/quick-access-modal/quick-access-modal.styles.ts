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
    top: 22%;
    padding-bottom: 0;
    background: transparent;
    .ant-modal {
      &-content {
        height: fit-content;
        overflow: hidden;
        background: transparent;
        box-shadow: none;
        svg {
          color: white;
        }
      }
      &-body {
        padding: 0;
      }
    }
  }
`
