import { Tabs } from 'antd'
import styled, { css } from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled(Tabs)<any>`
  &.ant-tabs {
    overflow: visible;
  }

  & .ant-tabs-nav {
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 1.875rem;
    padding: 0 1.5rem;
  }

  & .ant-tabs-tab {
    padding: 1rem 0;
    margin: 0 1rem;
    font-size: 0.875rem;
    line-height: 1.125rem;

    &:hover {
      color: ${getColorCarry('link')};
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
    color: ${getColorCarry('link')};
  }

  & .ant-tabs-tab-btn {
    transition: none;
  }

  & .ant-tabs-ink-bar {
    background-color: ${getColorCarry('link')};
  }

  & .ant-tabs-tab-btn:focus,
  & .ant-tabs-tab-remove:focus,
  & .ant-tabs-tab-btn:active,
  & .ant-tabs-tab-remove:active {
    color: ${getColorCarry('link')};
  }

  @media ${mediaQueries.TABLET} {
    //& .ant-tabs-ink-bar {
    //  display: none;
    //}

    &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-operations,
    .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-operations {
      display: none;
    }

    &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-wrap,
    &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-wrap {
      transform: none !important;
      justify-content: center;
      overflow: visible;

      &::before,
      &::after {
        display: none;
      }
    }

    &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
    &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
      transform: none !important;
      //padding: 0 1rem;
      transition: none;

      ${(props) =>
        props.$justify === 'between' &&
        css`
          width: 100%;
          justify-content: space-around;
        `}
    }

    // New mobile styles for tabs with scroll and column
    & .ant-tabs-nav {
      padding: 0;
      transform: none;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      overflow-y: auto;
      padding: 0 1rem;

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }
    }

    & .ant-tabs-tab {
      padding: 1rem 0;
      margin: 0 0.5rem;
    }

    & .tabs-label-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      white-space: nowrap;

      & svg {
        margin-right: 0;
      }
    }
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
