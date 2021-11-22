import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  align-items: center;
  padding: 1rem 1.875rem;
  display: grid;
  grid-template-columns: 2fr 4fr auto;
  gap: 1rem;
  background-color: ${getColorCarry('neutral_10')};
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }

  .CurrentPlanOverviewCard {
    &__title {
      font-size: 1rem;
      font-weight: 500;
      color: ${getColorCarry('neutral_100')};
    }

    &__name {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_70')};
    }

    &__action {
      font-size: 0.875rem;
      color: ${getColorCarry('link')};
      font-weight: 500;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`
