import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  .qa-logging-cardio {
    &__container {
      // position: relative;
      height: 730px;
      @media ${mediaQueries.MOBILE} {
        height: 100%;
      }
      h2 {
        text-align: center;
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
        color: white;
        margin-top: 37px;
      }
    }
    &__header {
      width: 80%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      h3 {
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        color: ${getColorCarry('neutral_60')};
      }
    }

    &__video-link {
      display: block;
      text-align: center;
      color: ${getColorCarry('link')};
      cursor: pointer;
      margin-top: 0.3rem;
    }

    &__timer {
      position: absolute;
      top: 43%;
      left: 20%;
      display: block;
      text-align: center;
      font-style: normal;
      font-weight: bold;
      font-size: 56px;
      line-height: 56px;
      color: white;
      z-index: 1;
    }

    &__timer-background {
      position: absolute;
      width: 206px;
      height: 240px;
      top: 33%;
      left: 24%;
      background: linear-gradient(
        181.63deg,
        #35373a -25%,
        rgba(53, 55, 58, 0) 98.62%
      );
      border-radius: 26px;
      transform: rotate(30deg);

      &::before {
        content: '';
        position: absolute;
        width: 206px;
        height: 240px;
        background: linear-gradient(
          160.35deg,
          #393d45 6.89%,
          rgba(53, 55, 58, 0) 84.46%
        );
        border-radius: 26px;
        transform: rotate(30deg);
        top: -6px;
      }

      &::after {
        content: '';
        position: absolute;
        width: 206px;
        height: 284px;
        background: linear-gradient(
          158.72deg,
          #3d4047 7.37%,
          rgba(53, 55, 58, 0) 96.67%
        );
        border-radius: 26px;
        transform: rotate(60deg);
        top: -28px;
        left: -6px;
      }
    }

    &__intensity {
      position: absolute;
      top: 65%;
      left: 42%;
      text-align: center;
      h2 {
        color: #3fc9ad;
      }
      span {
        font-size: 12px;
        line-height: 16px;
        color: ${getColorCarry('neutral_60')};
      }
    }

    &__button-group {
      position: absolute;
      bottom: 20px;
      width: calc(100% - 43px);
      button {
        width: 100%;
        margin-top: 15px;
      }
    }

    &__btn-mark-completed {
      color: ${getColorCarry('neutral_40')};
      border: 1px solid #5e5e5e;
      &:hover {
        color: ${getColorCarry('neutral_100')};
        background-color: ${getColorCarry('neutral_50')};
        border: inherit;
      }
    }
  }
`
