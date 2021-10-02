import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  width: 100%;
  padding-bottom: 3rem;

  .log-measurements {
    &__title {
      margin-bottom: 1.875rem;
    }

    &__submit {
      width: 100%;
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

      &:last-child {
        border-bottom: 0;
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
