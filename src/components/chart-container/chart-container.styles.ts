import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'
import Card from '../cards/card/card.component'
import Dialog from '../dialogs/dialog/dialog.component'

export const Styles = styled(Card)`
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
        // margin-left: -1.75rem;

        @media ${mediaQueries.LANDSCAPE} {
          flex: 1;
        }
      }
    }
  }
`

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

export const ChartCheckboxesStyles = styled.div`
  display: flex;
  align-items: center;
`

export const CheckboxStyles = styled.div`
  display: flex;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }

  .checkbox {
    &__text {
      font-size: 0.75rem;
      font-weight: 400;
      margin: 0 1rem;
    }

    & .ant-checkbox-wrapper {
      margin: 0 0.5rem;
    }

    &:first-child {
      margin-right: 3rem;
    }
  }
`
