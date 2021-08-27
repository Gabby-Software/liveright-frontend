import { Tabs } from 'antd'
import styled from 'styled-components'

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
        color: ${(p) => p.theme.vars.colors.link};
      }
    }
    &-ink-bar {
      background: ${(p) => p.theme.vars.colors.link};
    }
  }
`
