import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Link)`
  color: ${getColorCarry('neutral_100')};
  margin-bottom: 1.25rem;

  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  padding: 1.5rem 1.75rem;

  @media ${mediaQueries.TABLET} {
    padding: 1.5rem 1.25rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .PlanCard {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    &__name {
      font-size: 1rem;
      font-weight: 500;
    }

    &__subtitle {
      font-size: 0.875rem;

      & span {
        color: ${getColorCarry('neutral_70')};
      }
    }

    &__info {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      justify-content: flex-start;
      gap: 60px;
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    &__row {
      &-title {
        font-size: 0.75rem;
        color: ${getColorCarry('neutral_70')};
      }

      &-value {
        font-size: 0.875rem;
      }
    }
  }
`
