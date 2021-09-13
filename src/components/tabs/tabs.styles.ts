import { Tabs } from 'antd'
import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled(Tabs)`
  &.ant-tabs {
    overflow: visible;
  }

  & .ant-tabs-nav {
    background-color: #fff;
    padding: 0 1.75rem;
    border-radius: 10px;
    margin-bottom: 2.125rem;
  }
  & .ant-tabs-tab {
    padding: 17px 0;
    font-size: 0.875rem;
    line-height: 1.125rem;

    &:hover {
      color: ${getColorCarry('blue_70')};
    }
    svg {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  & .ant-tabs-tab-active .ant-tabs-tab-btn {
    text-shadow: none;
    font-weight: 700;
    color: ${getColorCarry('blue_70')};
  }
  & .ant-tabs-tab-btn {
    transition: none;
  }
  & .ant-tabs-ink-bar {
    background-color: ${getColorCarry('blue_70')};
  }

  @media ${mediaQueries.MOBILE} {
    & .ant-tabs-nav-wrap {
      justify-content: center;
    }

    & .ant-tabs-ink-bar {
      display: none;
    }

    & .ant-tabs-tab + .ant-tabs-tab {
      margin-left: 0;
    }

    & .ant-tabs-tab {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    & .ant-tabs-nav-list {
      justify-content: space-between;
    }

    & .ant-tabs-nav {
      &::before {
        display: none;
      }
    }

    &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-operations,
    .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-operations {
      display: none;
    }
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
