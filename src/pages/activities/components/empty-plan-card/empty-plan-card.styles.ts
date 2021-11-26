import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  background-color: ${getColorCarry('neutral_20')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1rem;

  .EmptyPlanCard {
    &__icon {
      width: 60px;
      height: 60px;
      margin-bottom: 1.5rem;
      color: ${getColorCarry('neutral_70')};
      opacity: 0.75;
    }

    &__text {
      font-size: 0.875rem;
      margin-bottom: 3rem;
      color: ${getColorCarry('neutral_70')};
    }
  }
`
