import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import { getShadow } from '../../../../pipes/theme-shadow.pipe'

export const Styles = styled.div`
  grid-area: 1 / 2 / 3 / 3;
  width: 100%;
  background: #ffffff;
  box-shadow: ${getShadow('secondary')};
  // secondary: '0px 0px 40px rgba(230, 45, 71, 0.03)'

  border-radius: 10px;
  padding: 30px;

  .dashboard-revenue {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    &__button {
      border: none;
      padding: 0;
      background: transparent;
      font-size: 18px;
      line-height: 26px;

      text-align: right;
      text-decoration-line: underline;

      color: ${getColorCarry('blue_70')};
      cursor: pointer;
    }

    & div .select__control {
      min-width: 150px;
      cursor: pointer;

      .select__value-container {
        position: static;
      }
    }
  }
  .dashboard-revenue__cards {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
    margin-bottom: 30px;
    max-height: 126px;

    .f-overview-label {
      min-height: 80px;
      margin: 0;
      background: ${getColorCarry('background')};
      border-radius: 12px;
      padding: 24px 24px 32px 24px;

      .f-overview-label__content .f-overview-label__value {
        color: ${getColorCarry('primaryDark_v2')};
      }

      .f-overview-label__title {
        margin: 0 auto;
        margin-bottom: 16px;
        color: ${getColorCarry('secondary')};

        &:before {
          display: none;
        }
      }
    }
  }
  .dashboard-revenue__checkbox {
    display: flex;
    align-items: center;
    &-label {
      font-family: Circular Std;
      font-size: 14px;
      line-height: 20px;
      color: #2e2f31;
      white-space: nowrap;

      label {
        margin-right: 14px;
      }
    }
  }
  & .recharts-responsive-container {
    margin-bottom: 50px;
  }
`
