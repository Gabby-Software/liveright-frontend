import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'
import Dialog from '../../../../components/dialogs/dialog/dialog.component'

export const Styles = styled.div<any>`
  width: 100%;
  padding-bottom: 3rem;

  @media ${mediaQueries.TABLET} {
    padding-top: ${(props) => (props.$client ? '1.25rem' : 0)};
  }

  .log-measurements {
    &__title {
      margin-bottom: 1.875rem;
    }

    &__submit {
      width: 100%;
      position: sticky;
      top: 1.5rem;

      @media ${mediaQueries.TABLET} {
        position: static;
        top: unset;
      }
    }

    &__submitContainer {
      display: flex;
      align-self: start;
      position: sticky !important;
      top: 1rem;
    }

    &__forms {
      margin-bottom: 1.875rem;
    }

    &__fields {
      width: 100%;

      @media ${mediaQueries.TABLET} {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.875rem;
      }
    }

    &__field {
      margin-bottom: 1.25rem;

      &:last-child {
        margin-bottom: 0;
      }

      @media ${mediaQueries.TABLET} {
        margin-bottom: 0;
      }
    }

    &__toggle-row {
      display: flex;
      align-items: center;

      & .toggle__body {
        margin-left: 0;
      }
    }

    &__toggle-label {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_70')};
      margin-left: 0.625rem;
    }

    &__toggle-container {
      margin-bottom: 1.875rem;
    }

    &__goals-form {
      padding-top: 1.875rem;
    }
  }
`

export const TotalStyles = styled(Card)`
  background-color: ${getColorCarry('red_10')};
  border: 1px solid ${getColorCarry('primary_v2')};

  .log-total {
    &__row {
      background-color: transparent;
      padding-left: 0;
      padding-right: 0;
      margin-bottom: 0;
      border-radius: 0;
      border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }

    &__label {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('secondary2_v2')};
      margin-bottom: 0.75rem;

      @media ${mediaQueries.TABLET} {
        font-size: 1.125rem;
      }
    }

    &__value {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};

      @media ${mediaQueries.TABLET} {
        font-size: 1.125rem;
      }
    }
  }
`

export const DialogStyles = styled(Dialog)`
  .measurements-dialog {
    &__icon {
      margin-bottom: 1.25rem;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__btncontainer {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }

    &__title {
      font-size: 1.125rem;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};
      text-align: center;
      margin-bottom: 1.5rem;
    }
  }
`
