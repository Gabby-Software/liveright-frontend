import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  display: grid;
  // grid-template-columns: 2fr 5fr;
  padding: 1.5rem 1.875rem;
  border-radius: 10px;
  background-color: ${getColorCarry('neutral_10')};
  margin-bottom: 1rem;

  @media ${mediaQueries.TABLET} {
    grid-template-columns: 1fr;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .SplitDayWorkoutCard {
    &__title {
      font-size: 1.125rem;
      color: ${getColorCarry('neutral_70')};
      margin-bottom: 0.5rem;

      @media ${mediaQueries.TABLET} {
        color: ${getColorCarry('neutral_100')};
      }
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
        // border-right: 1px solid ${getColorCarry('inputBorder_v2')};
      }

      &:last-child {
        padding-left: 2rem;
      }

      @media ${mediaQueries.TABLET} {
        &:first-child {
          padding-right: 0;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};
          border-right: 0;
          margin-bottom: 1.25rem;
        }
        &:last-child {
          padding-left: 0;
        }
      }
    }

    &__content {
      display: flex;
      align-items: center;

      @media ${mediaQueries.TABLET} {
        flex-direction: column;
      }
    }

    &__content-card {
      @media ${mediaQueries.TABLET} {
        border: 1px solid ${getColorCarry('inputBorder_v2')};
        border-radius: 10px;
        padding: 1rem;
        margin-top: 0.5rem;
        width: 100%;
      }

      &-title {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 0.75rem;
      }

      &-cols {
        display: flex;
        flex-wrap: wrap;
        margin: -0.5rem;
        width: auto;
      }

      &-col {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('neutral_100')};
        margin: 0.5rem;

        &-name {
          color: ${getColorCarry('neutral_70')};
        }

        &-link {
          word-break: break-all;
        }
      }
    }

    &__table {
      width: 100%;
      font-size: 0.875rem;
      font-weight: 400;
      empty-cells: hide;

      &-indent {
        text-indent: 2rem;
      }

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
