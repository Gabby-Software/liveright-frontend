import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import { getShadow } from '../../../../pipes/theme-shadow.pipe'

export const Styles = styled.div<{ userType: string }>`
  grid-area: ${(props) =>
    props.userType === userTypes.CLIENT ? '1 / 1 / 2 / 2' : '2 / 1 / 3 / 2'};
  width: 100%;
  background: #ffffff;
  box-shadow: ${getShadow('secondary')};
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  @media ${mediaQueries.MOBILE} {
    padding: 24px 20px;
    height: 524px;
    margin-bottom: 24px;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    &-title {
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
      color: ${getColorCarry('primaryDark_v2')};
      @media ${mediaQueries.MOBILE} {
        font-size: 18px;
      }
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
    margin-bottom: 25px;

    .item:nth-child(2n + 1) {
      border-radius: 10px;
      background: ${getColorCarry('background')};
      @media ${mediaQueries.MOBILE} {
        background: transparent;
      }
    }

    .item a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 13px 20px;
      border-radius: 10px;
      color: ${getColorCarry('primaryDark')};

      @media ${mediaQueries.MOBILE} {
        padding: 13px 0;
      }
      div {
        display: flex;
        align-items: center;
      }

      .item__description {
        font-size: 18px;
        line-height: 20px;
        @media ${mediaQueries.MOBILE} {
          font-size: 14px;
          max-width: 185px;
        }
      }

      .item__icon {
        width: 32px;
        height: 32px;
        border-radius: 50%;

        &-checked {
          background: rgba(63, 201, 173, 0.1);
        }
        &-unchecked {
          background: #ededed;
        }

        .checked {
          stroke: #3fc9ad;
          margin: auto;
        }
        .unchecked {
          margin: auto;
          stroke: #c2c2c2;
        }
      }

      div .notification__icon {
        min-width: 36px;
        min-height: 36px;
        width: 36px;
        height: 36px;
        border-radius: 9999px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;

        background-color: ${getColorCarry('secondary2_v2')};
        &__info {
          background-color: ${getColorCarry('secondary2_v2')};
        }
        &__invoice {
          background-color: ${getColorCarry('green_20')};
          color: ${getColorCarry('green_80')};
        }
        &__session {
          background-color: ${getColorCarry('yellow_20')};
          color: ${getColorCarry('yellow_80')};
        }
      }
    }
  }
  button {
    margin-top: auto;
  }
`
