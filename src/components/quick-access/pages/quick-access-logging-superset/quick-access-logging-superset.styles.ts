import Modal from 'antd/lib/modal/Modal'
import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  @media ${mediaQueries.MOBILE} {
    height: 100%;
  }
  .qa-logging-superset {
    &__container {
      position: relative;
      h2 {
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
      }

      h3 {
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        color: ${getColorCarry('primaryDark2_v2')};
      }

      @media ${mediaQueries.MOBILE} {
        height: 100%;
      }
    }

    &__progressbar {
      margin-top: 16px;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 22px;
    }

    &__video-link {
      display: block;
      color: ${getColorCarry('link')};
      cursor: pointer;
      margin-top: 3px;
    }

    &__exercise-info {
      display: flex;
      gap: 30px;
      span {
        font-size: 14px;
        line-height: 20px;
        color: ${getColorCarry('neutral_60')};
      }
      p {
        color: white;
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
      }
    }

    &__body {
      margin-bottom: calc(100vh - 622px);
      @media ${mediaQueries.MOBILE} {
        margin-bottom: 0;
      }
    }

    &__table-container {
      border-radius: 10px;
      background-color: ${getColorCarry('neutral_10')};
      margin: 16px 0;
      width: 100%;
      padding: 0 20px;
      max-height: calc(100vh - 690px);
      overflow: auto;
      @media ${mediaQueries.MOBILE} {
        max-height: calc(100vh - 500px);
      }
      table {
        width: 100%;
        height: 100%;
      }
      thead {
        position: sticky;
        inset-block-start: 0;
        background-color: ${getColorCarry('neutral_10')};
        z-index: 1;
      }
      th {
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        color: ${getColorCarry('neutral_60')};
        padding: 20px 0 16px 0;
        text-align: left;
        width: 30px;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          bottom: -1px;
          border-bottom: 1px solid ${getColorCarry('neutral_40')};
        }
      }
      td {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: ${getColorCarry('primaryDark2_v2')};
        padding: 16px 0;
        position: relative;
        svg {
          color: ${getColorCarry('neutral_60')};
          vertical-align: sub;
          cursor: pointer;
        }
        input {
          width: 58px;
          height: 40px;
        }
        button {
          cursor: pointer;
          height: 40px;
          width: 40px;
          background-color: #3fc9ad;
          outline: none;
          border: inherit;
          border-radius: 10px;
          color: white;
        }
      }
    }

    &__add-set-button {
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

    &__footer {
      position: fixed;
      bottom: 25px;
      width: 100%;
      background-color: #2e2f31;
      padding: 0 20px 20px 20px;
      margin-top: 90px;
      // ignore parent's padding
      margin-left: -22px;
      margin-bottom: -25px;
      border-radius: 0 0 10px 10px;
      @media ${mediaQueries.MOBILE} {
        border-radius: 0;
      }
    }

    &__volume {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: ${getColorCarry('neutral_60')};
      span {
        color: white;
      }
    }

    &__input-group {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
    }

    &__button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      button {
        width: 48%;
      }
    }

    &__button-skip {
      color: white;
      border: 1px solid ${getColorCarry('neutral_40')};
      &:hover {
        color: ${getColorCarry('neutral_100')};
        background-color: ${getColorCarry('neutral_40')};
        border: inherit;
      }
    }

    &__current-exercise {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #252627;
      padding: 13px 20px;
      margin-bottom: 16px;
      // ignore parent padding
      width: calc(100% + 40px);
      margin-left: -20px;
      h2 {
        color: white;
      }
    }
  }

  .upcoming-set {
    color: ${getColorCarry('neutral_50')} !important;
  }
  .current-set {
    color: #e49a0a !important;
    span {
      position: absolute;
      top: 16px;
    }
  }
  .add-set-modal {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
  }

  & .ant-modal-body {
    background-color: red;
  }
`

export const AddSetModal = styled(Modal)`
  .ant-modal {
    &-close {
      padding: 12px;
      svg {
        width: 18px;
        height: 18px;
        color: ${(p) => p.theme.vars.colors.primaryDark};
      }
    }

    &-content {
      min-height: 260px;
      max-height: 80vh;
      height: fit-content;
      // overflow: auto;
      border-radius: 10px;
      svg {
        margin-bottom: 8px;
      }
    }

    &-body {
      padding: 20px;
      height: 100%;
      overflow: auto;
      h1 {
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
        margin-bottom: 20px;
      }
      h2 {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: ${getColorCarry('neutral_60')};
      }
      button {
        cursor: pointer;
        display: block;
        width: 100%;
        border-radius: 10px;
        padding: 16px 20px;
        background-color: ${getColorCarry('neutral_20')};
        outline: none;
        border: 1px solid ${getColorCarry('neutral_30')};
        text-align: left;
        margin-top: 10px;
      }
    }
  }
  @media all and (max-width: ${(p) => p.theme.vars.media.tablet}px) {
    top: 22%;
    left: 5%;
    padding-bottom: 0;
    width: 90% !important;
    max-width: 100%;
    margin: 0;
    .ant-modal {
      &-content {
        min-height: 260px;
        max-height: 80vh;
        height: fit-content;
        // overflow: auto;
        border-radius: 10px;
        svg {
          margin-bottom: 8px;
        }
      }
      &-body {
        padding: 20px;
        height: 100%;
        overflow: auto;
        h1 {
          font-weight: bold;
          font-size: 18px;
          line-height: 26px;
          margin-bottom: 20px;
        }
        h2 {
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
          color: ${getColorCarry('neutral_60')};
        }
        button {
          display: block;
          width: 100%;
          border-radius: 10px;
          padding: 16px 20px;
          background-color: ${getColorCarry('neutral_20')};
          outline: none;
          border: 1px solid ${getColorCarry('neutral_30')};
          text-align: left;
          margin-top: 10px;
        }
      }
    }
  }
`
