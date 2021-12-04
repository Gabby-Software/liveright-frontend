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
  padding: 24px 34px;

  @media ${mediaQueries.MOBILE} {
    padding: 21px 20px;
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
      font-size: 22px;
      @media ${mediaQueries.MOBILE} {
        font-size: 18px;
      }
    }

    &__button {
      border: none;
      padding: 0;
      background: transparent;
      font-size: 16px;
      color: ${getColorCarry('link')};
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
    gap: 18px;
    margin-bottom: 30px;

    @media ${mediaQueries.MOBILE} {
      display: block;
      padding: 0 20px;
    }

    .f-overview-label {
      min-height: 80px;
      margin: 0;
      background: ${getColorCarry('background')};
      border-radius: 12px;
      padding: 24px 26px;
      display: block;

      @media ${mediaQueries.MOBILE} {
        min-height: auto;
        padding: 14px 20px;
        margin-bottom: 18px;
        border: 1px solid rgba(231, 233, 236, 0.8);
        background: ${getColorCarry('white')};
      }
      .f-overview-label__content {
        display: flex;
        align-items: center;

        .f-overview-label__value {
          color: ${getColorCarry('primaryDark_v2')};
          font-size: 18px;
          font-weight: 700;
          @media ${mediaQueries.MOBILE} {
            font-weight: bold;
          }
        }

        .f-overview-label__note {
          font-size: 14px;
          font-weight: 700;
          @media ${mediaQueries.MOBILE} {
            font-weight: bold;
          }
        }
      }

      .f-overview-label__title {
        font-size: 14px;
        margin: 0 auto;
        margin-bottom: 1.125rem;
        color: ${getColorCarry('secondary')};

        @media ${mediaQueries.MOBILE} {
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
  & .no-data {
    margin-bottom: 50px;
  }
`
