import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  .qa-meal-overview {
    &__header {
      h2 {
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
        color: white;
      }
      h3 {
        color: white;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
      }
      &-macronutrients {
        position: absolute;
        top: 135px;
        display: flex;
        gap: 8px;
        width: 90%;
        overflow: auto;

        @media ${mediaQueries.TABLET} {
          width: 100%;
          -ms-overflow-style: none;
          scrollbar-width: none;
          padding-right: 40px;
        }
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    &__top-spacing {
      width: 100%;
      background-color: ${getColorCarry('neutral_10')};
      height: 70px;
      // ignore parent padding
      width: calc(100% + 44px);
      margin-left: -22px;
      margin-top: 70px;
    }

    &__body {
      background-color: ${getColorCarry('neutral_10')};
      padding: 0 20px 20px 20px;
      // ignore parent padding
      width: calc(100% + 44px);
      margin-left: -22px;
      height: 400px;
      overflow-y: auto;

      @media ${mediaQueries.TABLET} {
       height: calc(100vh - 400px);
      }
    }

    &__footer {
      width: 100%%;
      button {
        margin-top: 20px;
        width: 100%;
      }
    }

    &__add-food-button {
      display: flex;
      justify-content: center;
      gap: 9px;
      color: ${getColorCarry('neutral_70')};
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23757575' stroke-width='1' stroke-dasharray='6%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
      border-radius: 10px;
      border: none;
      padding: 0.75rem;
      width: 100%;
      background-color: ${getColorCarry('white')};
      cursor: pointer;

      // &:hover {
      //   background-color: ${getColorCarry('neutral_10')};
      // }
    }

    &__meal-card {
      background-color: white;
      box-shadow: 1px -3px 24px rgba(129, 136, 172, 0.15);
      border-radius: 10px;
      padding: 20px;
      h2 {
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        color: #404040;
      }
      button {
        padding: 0;
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
        color: ${getColorCarry('link')};
        margin-top: 10px;
        svg {
          margin-left: 5px;
        }
      }

      &-macronutrients {
        display: flex;
        gap: 8px;
        width: 90%;
        overflow: auto;
        margin-top: 10px;

        @media ${mediaQueries.TABLET} {
          width: 100%;
          -ms-overflow-style: none;
          scrollbar-width: none;
          padding-right: 40px;
        }
        &::-webkit-scrollbar {
          display: none;
        }
      }
      
      &-input-group {
        display: flex;
        gap: 16px;
        justify-content: space-between;
        margin-top: 20px;
        input {
          width: 100%;
        }
      }
      }
    }
  }
`
