import { Tabs } from 'antd'
import styled from 'styled-components'

export const Styles = styled(Tabs)`
  & .ant-tabs-nav {
    background-color: #fff;
    padding: 0 1.75rem;
    border-radius: 10px;
    margin-bottom: 2.125rem;
  }
  & .ant-tabs-tab {
    padding: 17px 0;
    font-size: 0.875rem;

    &:hover {
      color: ${(props) => props.theme.vars.colors.blue_70};
    }
  }
  & .ant-tabs-tab-active .ant-tabs-tab-btn {
    text-shadow: none;
    font-weight: 700;
    color: ${(props) => props.theme.vars.colors.blue_70};
  }
  & .ant-tabs-tab-btn {
    transition: none;
  }
  & .ant-tabs-ink-bar {
    background-color: ${(props) => props.theme.vars.colors.blue_70};
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
