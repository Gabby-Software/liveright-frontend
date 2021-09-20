import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const DialogStyles = styled(Dialog)`
  .chart-dialog {
    &__icon {
      margin-bottom: 1.25rem;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__title {
      font-size: 1.125rem;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};
      text-align: center;
      margin-bottom: 1.5rem;
    }

    &__button {
      font-weight: 700;
    }
  }
`

export const Styles = styled(Card)`
  margin-bottom: 2rem;

  @media ${mediaQueries.LANDSCAPE} {
    margin-bottom: 0;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1111;
    border-radius: 0;
    max-width: 100vw;
    max-height: 100vh;
  }

  .chart {
    &__title {
      font-size: 1.125rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};
      align-items: center;
      justify-content: space-between;

      @media ${mediaQueries.LANDSCAPE} {
        color: #fff;
      }

      &-container {
        margin-bottom: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${getColorCarry('primaryDark_v2')};

        @media ${mediaQueries.LANDSCAPE} {
          color: #fff;
          width: auto;
          margin: -1.5rem -1.75rem 2rem -1.75rem;
          background-color: ${getColorCarry('primaryDark_v2')};
          padding: 1.5rem 1.25rem;
        }
      }
    }

    &__chart {
      &-container {
        width: auto;
        margin-left: -1.75rem;

        @media ${mediaQueries.LANDSCAPE} {
          flex: 1;
        }
      }
    }

    &__checkboxes {
      display: flex;
      align-items: center;
    }

    &__quality {
      display: flex;
      align-items: center;

      &-text {
        font-size: 0.75rem;
        font-weight: 400;
        display: flex;
        align-items: center;
        margin: 0 1rem;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '';
          display: block;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          position: absolute;
          left: 0;
        }

        &:nth-child(1) {
          &::before {
            background-color: ${getColorCarry('green_90')};
          }
        }

        &:nth-child(2) {
          &::before {
            background-color: ${getColorCarry('red_80')};
          }
        }

        &:nth-child(3) {
          &::before {
            background-color: ${getColorCarry('yellow_60')};
          }
        }
      }
    }

    &__checkbox {
      display: flex;
      align-items: center;

      &-text {
        font-size: 0.75rem;
        font-weight: 400;
      }

      & .ant-checkbox-wrapper {
        margin: 0 0.5rem;
      }

      &:first-child {
        margin-right: 3rem;
      }
    }
  }
`
