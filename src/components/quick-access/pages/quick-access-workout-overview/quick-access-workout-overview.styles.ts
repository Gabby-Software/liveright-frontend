import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  h4 {
    color: ${getColorCarry('neutral_50')};
    font-weight: 400;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${getColorCarry('white')};

    h2 {
      color: inherit;
      font-weight: bold;
    }

    svg {
      cursor: pointer;
    }
  }

  .body {
    margin-top: 16px;
    // ignore parent padding
    width: calc(100% + 44px);
    margin-left: -22px;
    background-color: ${getColorCarry('neutral_10')};
    padding: 20px;
    max-height: 500px;
    overflow-y: auto;

    @media ${mediaQueries.TABLET} {
      max-height: calc(100vh - 280px);
    }
  }

  .exercise-card {
    padding: 20px;
    border-radius: 10px;
    background-color: ${getColorCarry('white')};
    box-shadow: 1px -3px 24px rgba(129, 136, 172, 0.15);
    display: flex;
    justify-content: space-between;
    gap: 50px;
    margin-bottom: 1rem;

    h4 {
      font-weight: normal;
      color: ${getColorCarry('neutral_60')};
    }
  }

  .superset-exercise {
    margin: 0;
    box-shadow: none;
    border-top: 2px solid ${getColorCarry('neutral_20')};
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .video-link {
    display: flex;
    align-items: center;
    color: ${getColorCarry('link')};
    cursor: pointer;
    margin-top: 0.3rem;
    gap: 7px;
  }

  .exercise-data {
    display: flex;
    justify-content: space-between;
    gap: 4px;
    flex-grow: 1;

    &-card {
      padding: 0.75rem 0.875rem;
      border-radius: 10px;
      background-color: ${getColorCarry('neutral_10')};
      text-align: center;
      flex-grow: 1;

      h3 {
        font-weight: bold;
      }
      h4 {
        font-weight: normal;
        color: ${getColorCarry('neutral_60')};
      }
    }
  }

  .superset-card {
    padding: 20px 0 0 0;
    border-radius: 10px;
    background-color: ${getColorCarry('white')};
    box-shadow: 1px -3px 24px rgba(129, 136, 172, 0.15);
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-bottom: 1rem;

    &-header {
      margin-left: 20px;
    }
  }

  .footer {
    padding-top: 20px;
  }

  .add-exercise-button {
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

  .button-group {
    margin-top: 1.25rem;
    display: flex;
    justify-content: space-between;
    gap: 8px;

    &__button {
      max-width: 165px;
      @media ${mediaQueries.MOBILE} {
        max-width: 200px:
        max-width: none;
        flex-grow: 1;
      }
    }
  }

  .workout-video {
    margin-top: 35px;
  }
`
