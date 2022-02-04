import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  @media ${mediaQueries.MOBILE} {
    height: 100%;
  }
  .qa-log-superset {
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

    &__body {
      height: calc(100vh - 423px);
      overflow: auto;
      @media ${mediaQueries.MOBILE} {
        margin-bottom: 0;
        height: calc(100% - 180px);
      }
    }

    &__exercise-card {
      padding: 0;
      border-radius: 10px;
      background-color: ${getColorCarry('white')};
      box-shadow: 1px -3px 24px rgba(129, 136, 172, 0.15);
      display: flex;
      justify-content: space-between;
      gap: 50px;
      margin-top: 20px;

      h4 {
        font-weight: normal;
        color: ${getColorCarry('neutral_60')};
      }
    }

    &__superset-exercise {
      box-shadow: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &__video-link {
      display: flex;
      align-items: center;
      color: ${getColorCarry('link')};
      cursor: pointer;
      margin-top: 0.3rem;
      gap: 7px;
    }

    &__exercise-data {
      display: flex;
      justify-content: end;
      gap: 4px;
      flex-grow: 1;

      &-card {
        padding: 0.75rem 0.875rem;
        border-radius: 10px;
        background-color: ${getColorCarry('neutral_10')};
        text-align: center;
        flex-grow: 1;
        max-width: 80px;
        gap: 8px;

        h3 {
          font-weight: bold;
        }
        h4 {
          font-weight: normal;
          color: ${getColorCarry('neutral_60')};
        }
      }
    }

    &__superset-card {
      padding: 20px 0 0 0;
      border-radius: 10px;
      background-color: ${getColorCarry('white')};
      display: flex;
      flex-direction: column;
      gap: 0;
      margin-bottom: 1rem;

      &-header {
        padding-bottom: 10px;
        border-bottom: 2px solid ${getColorCarry('neutral_20')};
      }
    }
    
    &__button-group {
        button {
            margin-top: 16px;
            width: 100%;
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
  }
`
