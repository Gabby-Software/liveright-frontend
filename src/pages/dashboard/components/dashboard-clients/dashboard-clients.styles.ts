import styled from 'styled-components'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import { getShadow } from '../../../../pipes/theme-shadow.pipe'

export const Styles = styled.div`
  grid-area: 3 / 1 / 4 / 3;
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
      color: #2e2f31;
    }

    &-button {
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

    &-search {
      max-width: 400px;
    }

    &-select {
      max-width: 200px;
    }
  }
  .open-all-button {
    border: none;
    padding: 0;
    background: transparent;
    font-size: 14px;
    line-height: 18px;
    text-align: right;
    text-decoration-line: underline;

    color: ${getColorCarry('blue_70')};
    cursor: pointer;

    & svg {
      stroke: ${getColorCarry('blue_70')};
    }
  }
`
