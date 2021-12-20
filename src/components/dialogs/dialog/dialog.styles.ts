import { Modal } from 'antd'
import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const DialogStyles = styled<any>(Modal)`
  &.ant-modal {
    width: 100%;
    max-width: ${(props) => (props.extended ? '1200px' : '620px')};
    padding: 1rem;
  }

  & .ant-modal-content {
    border-radius: 10px;
    overflow-x: hidden;
  }

  & .ant-modal-header {
    padding: 1rem 1.875rem;
    background-color: ${getColorCarry('primary_v2')};
    color: #fff;
  }

  & .ant-modal-title {
    font-size: 1.375rem;
    color: #fff;
    font-weight: 700;
  }

  & .ant-modal-close {
    color: #fff;
    transition: none;
    padding-right: 0.5rem;
  }

  & .ant-modal-close-x {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .ant-modal-body {
    padding: 1.875rem;
    background-color: ${getColorCarry('background_v2')};
  }
`
