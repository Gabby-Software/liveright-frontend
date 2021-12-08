import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  background-color: ${getColorCarry('neutral_10')};
  padding: 1.5rem;
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }

  .OtherWorkout {
    &__actions {
      display: flex;
      align-items: center;
      padding-top: 1.25rem;
      border-top: 1px solid ${getColorCarry('inputBorder_v2')};
    }

    &__action-btn {
      & svg {
        margin-right: 0.5rem;
      }
    }
  }
`
