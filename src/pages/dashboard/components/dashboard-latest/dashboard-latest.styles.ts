import styled from 'styled-components'
import { getShadow } from '../../../../pipes/theme-shadow.pipe'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  width: 100%;
  background: #ffffff;
  box-shadow: ${getShadow('secondary')};
  border-radius: 10px;
  padding: 30px;

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    &-title {
      font-weight: bold;
      font-size: 22px;
      line-height: 32px;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &-button {
      border: none;
      padding: 0;
      background: transparent;
      font-size: 18px;
      line-height: 26px;
      text-decoration-line: underline;

      color: ${getColorCarry('blue_70')};
      cursor: pointer;
    }
  }

  .latest__tabs {
    .ant-tabs-nav {
      padding: 0;

      .ant-tabs-nav-wrap .ant-tabs-nav-list :first-child {
        margin-left: 0;
      }
    }
  }

  .list {
    margin: 0;
    padding: 0;
    list-style: none;

    .item:nth-child(2n) {
      border-radius: 10px;
      background: ${getColorCarry('background')};
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 13px 20px;
      border-radius: 10px;

      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      div .item__avatar {
        margin-right: 10px;
        border-radius: 50%;
      }

      div .item__name {
        font-weight: 500;
        font-size: 18px;
        line-height: 26px;
      }

      &__description {
        font-size: 18px;
        line-height: 26px;
      }

      &__icon {
        stroke: ${getColorCarry('blue_70')};
      }
    }
  }
`
