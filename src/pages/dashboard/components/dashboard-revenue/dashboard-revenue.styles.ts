import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import { getShadow } from '../../../../pipes/theme-shadow.pipe'

export const Styles = styled.div`
  grid-area: 1 / 2 / 3 / 3;
  width: 100%;
  background: ${getColorCarry('white')};
  box-shadow: ${getShadow('secondary')};
  border-radius: 10px;
  padding: 30px;

  @media ${mediaQueries.MOBILE} {
    padding: 20px 0;
    margin-bottom: 24px;
  }

  .dashboard-revenue {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    @media ${mediaQueries.MOBILE} {
      padding: 0 20px;
    }
    &__title {
      @media ${mediaQueries.MOBILE} {
        font-size: 18px;
      }
    }

    &__button {
      border: none;
      padding: 0;
      background: transparent;
      font-size: 18px;
      color: ${getColorCarry('blue_70')};
      cursor: pointer;

      @media ${mediaQueries.MOBILE} {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }

  .dashboard-revenue__chart-controller {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    @media ${mediaQueries.MOBILE} {
      padding: 0 20px;
    }

    @media ${mediaQueries.MOBILE} {
      margin-top: 75px;
    }

    & div {
      @media ${mediaQueries.MOBILE} {
        width: 118px;
      }
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

    @media ${mediaQueries.MOBILE} {
      display: block;
      padding: 0 20px;
    }

    .f-overview-label {
      min-height: 80px;
      margin: 0;
      background: ${getColorCarry('background')};
      border-radius: 12px;
      padding: 24px 24px 32px 24px;

      @media ${mediaQueries.MOBILE} {
        min-height: auto;
        padding: 14px 20px;
        margin-bottom: 18px;
        border: 1px solid rgba(231, 233, 236, 0.8);
        background: ${getColorCarry('white')};
      }
      .f-overview-label__content {
        @media ${mediaQueries.MOBILE} {
          margin-right: auto;
        }
      }
      .f-overview-label__content .f-overview-label__value {
        color: ${getColorCarry('primaryDark_v2')};
        @media ${mediaQueries.MOBILE} {
          font-weight: bold;
          font-size: 18px;
          line-height: 26px;
          margin-right: auto;
        }
      }

      .f-overview-label__title {
        margin: 0 auto;
        margin-bottom: 16px;
        color: ${getColorCarry('secondary')};

        @media ${mediaQueries.MOBILE} {
          font-size: 14px;
          line-height: 20px;
          margin: 0;
          margin-right: auto;
        }

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
      font-size: 14px;
      line-height: 20px;
      color: #2e2f31;
      white-space: nowrap;

      label {
        margin-right: 14px;
        @media ${mediaQueries.MOBILE} {
          margin-right: 10px;
        }
      }
    }
  }
  & .recharts-responsive-container {
    margin-bottom: 50px;
    svg {
      @media ${mediaQueries.MOBILE} {
        width: 300px;
      }
    }
  }
`
