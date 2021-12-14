import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)<any>`
  padding: 0;
  margin-bottom: 1.25rem;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  .WorkoutDayAccordion {
    &__name-input {
      margin-bottom: 1.25rem;
    }

    &__subtitle {
      font-size: 0.875rem;
      color: ${getColorCarry('neutral_70')};
      margin-bottom: 1rem;
      font-weight: 500;
    }
  }
`
