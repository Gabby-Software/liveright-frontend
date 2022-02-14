import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  display: grid;
  grid-template-columns: 2fr 6fr;
  padding: 1.5rem 1.875rem;
  border-radius: 10px;
  background-color: ${getColorCarry('neutral_10')};
  margin-bottom: 1rem;

  @media ${mediaQueries.TABLET} {
    display: flex;
    flex-direction: column;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .SplitDayMealCard {
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
      min-width: 100%;
      &:first-child {
        padding-right: 2rem;
        border-right: 1px solid ${getColorCarry('inputBorder_v2')};
      }

      &:last-child {
        padding-left: 2rem;
      }

      @media ${mediaQueries.TABLET} {
        &:first-child {
          padding-right: 0;
          border-right: 0;
          margin-bottom: 0.5rem;
        }

        &:last-child {
          padding-left: 0;
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;

      &-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};
      }

      &-title {
        font-size: 0.875rem;
        color: ${getColorCarry('neutral_70')};
      }

      &-toggle {
        padding: 0;

        & svg {
          margin-right: 0.5rem;
        }
      }

      &-row {
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }
    }

    &__macronutrients {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      margin: 0 -0.25rem;
      margin-bottom: 1.25rem;
      overflow-x: auto;

      -ms-overflow-style: none;
      scrollbar-width: none; /* Firefox */

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__macronutrient {
      padding: 1rem;
      border-radius: 10px;
      background-color: ${getColorCarry('neutral_100')};
      color: #fff;
      font-size: 0.8rem;
      font-weight: 400;
      min-width: 100px;
      margin: 0.25rem;

      &-value {
        font-size: 1.125rem;
        font-weight: 700;
      }
    }
  }
`
