import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import { getShadow } from '../../../../pipes/theme-shadow.pipe'

export const Styles = styled.div`
  grid-area: 3 / 1 / 4 / 3;
  width: 100%;
  background: #ffffff;
  box-shadow: ${getShadow('secondary')};
  border-radius: 10px;
  padding: 30px;
  @media ${mediaQueries.MOBILE} {
    padding: 20px;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    @media ${mediaQueries.MOBILE} {
      margin-bottom: 20px;
    }

    &-title {
      font-weight: bold;
      font-size: 22px;
      line-height: 32px;
      color: #2e2f31;
      @media ${mediaQueries.MOBILE} {
        font-size: 18px;
      }
    }

    &-button {
      border: none;
      padding: 0;
      background: transparent;
      font-size: 18px;

      color: ${getColorCarry('link')};
      cursor: pointer;
      @media ${mediaQueries.MOBILE} {
        font-size: 14px;
      }
    }

    &-search {
      max-width: 480px;
    }
  }
`
export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 30px;

  .item {
    padding: 14px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item-wrapper {
      &__name {
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        color: #10243d;
        margin-bottom: 8px;
      }

      &__property {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-number {
          font-size: 14px;
          line-height: 20px;
          color: #8794a5;
          margin-right: 20px;

          svg {
            width: 16px;
            height: 16px;
            stroke: #8794a5;
            margin-right: 8px;
          }
        }
        &-sessions {
          font-size: 14px;
          line-height: 20px;
          color: #8794a5;

          svg {
            width: 16px;
            height: 16px;
            stroke: #8794a5;
            margin-right: 8px;
          }
        }
      }
    }
    .item-wrapper__icon {
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background: rgba(135, 148, 165, 0.1);
    }
  }
`
