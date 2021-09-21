import { Button } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
  .progress {
    &__chart-btn {
      font-size: 0.875rem;
      font-weight: 400;
      height: fit-content;
      padding: 0;

      & svg {
        margin-right: 0.5rem;
      }

      & span {
        text-decoration: underline;
      }
    }

    &__form {
      padding-top: 1.25rem;
    }

    &__form-item {
      margin-bottom: 1.25rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

export const FilterWrapper = styled.div``

export const TableWrapper = styled.div`
  margin: 16px 0;

  .ant-tabs {
    & .tabs-label-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      letter-spacing: 0;
      word-spacing: -3px;
      font-size: 0.875rem;
      text-align: center;
      justify-content: space-between;
      height: 100%;
      //white-space: nowrap;

      svg {
        width: 22px;
        height: 22px;
        margin: 0;
      }
    }

    & .ant-tabs-nav-wrap {
      overflow: initial;
      white-space: initial;
      transform: none;
      justify-content: center;
    }

    & .ant-tabs-nav {
      padding: 0 0.5rem;
    }

    & .ant-tabs-tab {
      height: 100%;

      & .ant-tabs-tab-btn {
        height: 100%;
        flex: 1;
      }
    }
  }
`

export const SwitchViewButton = styled(Button)`
  margin-left: auto;
  margin-bottom: 8px;
  padding: 0;
`
