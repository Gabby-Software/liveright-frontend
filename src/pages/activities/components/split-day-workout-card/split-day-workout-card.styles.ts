import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  display: grid;
  grid-template-columns: 2fr 5fr;
  padding: 1.5rem 1.875rem;
  border-radius: 10px;
  background-color: ${getColorCarry('neutral_10')};
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  .SplitDayWorkoutCard {
    &__title {
      font-size: 1.125rem;
      color: ${getColorCarry('neutral_70')};
      margin-bottom: 0.5rem;
    }

    &__subtitle {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      color: ${getColorCarry('neutral_70')};

      & svg {
        width: 18px;
        height: 18px;
        margin-right: 0.25rem;
      }
    }

    &__card {
      &:first-child {
        padding-right: 2rem;
        border-right: 1px solid ${getColorCarry('inputBorder_v2')};
      }

      &:last-child {
        padding-left: 2rem;
      }
    }

    &__content {
      display: flex;
      align-items: center;
    }

    &__table {
      width: 100%;
      font-size: 0.875rem;
      font-weight: 400;

      & thead tr th {
        padding: 0 0.25rem 1rem 0.25rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_70')};
        border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};
        text-align: left;

        &:first-child {
          padding-left: 1.25rem;
        }

        &:last-child {
          padding-right: 1.25rem;
        }
      }

      & tbody tr td {
        padding: 0.5rem 0.25rem 0.5rem 0.25rem;

        &:first-child {
          padding-left: 1.25rem;
        }

        &:last-child {
          padding-right: 1.25rem;
        }
      }

      & tbody tr:first-child td {
        padding-top: 1rem;
      }
    }
  }
`
