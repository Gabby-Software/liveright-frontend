import { Drawer } from 'antd'
import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled(Drawer)<any>`
  & .ant-drawer-content-wrapper {
    max-height: 100%;
  }

  & .ant-drawer-header {
    background-color: ${getColorCarry('primary_v2')};
    padding: 1rem 1.875rem;
    border-radius: 0;
  }

  & .ant-drawer-title {
    font-size: 1.375rem;
    color: #fff;
    font-weight: 700;
  }

  & .ant-drawer-close {
    height: 100%;
    padding: 0 1.875rem;
    display: flex;
    align-items: center;

    color: #fff;
  }

  & .ant-drawer-body {
    background-color: ${getColorCarry('background_v2')};
    padding: 1.875rem;
    min-height: calc(100% - 55px);
  }
`
