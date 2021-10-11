import { Tabs } from 'antd'
import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div``

export const StyledTabs = styled(Tabs)`
  .ant-tabs {
    &-nav {
      &:before {
        border-bottom: none;
      }
      margin: 0 0 20px 0;
    }

    &-tab {
      padding-top: 0;
    }

    &-tab-active {
      .ant-tabs-tab-btn {
        color: ${getColorCarry('link')};
        text-shadow: none;
        font-weight: 500;
      }
    }

    &-ink-bar {
      background: ${getColorCarry('link')};
    }
  }
`
