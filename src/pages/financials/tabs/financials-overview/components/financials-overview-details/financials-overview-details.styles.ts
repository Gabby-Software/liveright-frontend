import styled from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export default styled.div`
  margin: 20px 0;
  background-color: ${getColorCarry('white')};
  border-radius: 10px;

  .header {
    margin: 0;
    padding: 16px;
    background-color: ${getColorCarry('primary_v2')};
    border-radius: 10px 10px 0 0;

    h3 {
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      color: ${getColorCarry('white')};
    }
  }

  .content {
    & > .ant-collapse > .ant-collapse-item > .ant-collapse-header {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      border-bottom: 1px solid ${getColorCarry('neutral_30')};
      margin: 0 24px;
      padding: 32px 24px 32px 0;

      & .ant-collapse-arrow {
        right: 4px;
        & svg {
          transform: rotate(180deg);
        }
      }
    }

    &
      > .ant-collapse
      > .ant-collapse-item.ant-collapse-item-active
      > .ant-collapse-header {
      border-bottom: 0;
    }

    & > .ant-collapse > .ant-collapse-item > .ant-collapse-content {
      background-color: #fafafa;

      & > .ant-collapse-content-box {
        padding: 12px 24px;
      }
    }

    & .tabularData {
      width: 100%;
      font-size: 14px;
      line-height: 40px;
      padding: 10px;

      & .value {
        padding-right: 4px;
        text-align: right;
        color: ${getColorCarry('neutral_70')};

        & .red {
          color: ${getColorCarry('red_50')};
        }

        & .green {
          color: ${getColorCarry('green_90')};
        }
      }
    }

    & .loading {
      width: 100%;
      padding: 30px 0;
      text-align: center;
    }
  }
`
