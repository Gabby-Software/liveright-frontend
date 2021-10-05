import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'
import Card from '../../cards/card/card.component'

export const Styles = styled(Card)`
  background-color: ${getColorCarry('primaryDark_v2')};
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;

  .progress-card {
    &__icon {
      margin-right: 1.5rem;

      & svg {
        width: 40px;
        height: 40px;
      }
    }

    &__content {
      flex: 1;
    }

    &__title {
      font-size: 1rem;

      &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: ${getColorCarry('neutral_50')};
        font-weight: 400;
      }
    }

    &__subtitle {
      font-size: 0.75rem;
    }

    &__value {
      font-size: 1rem;
      font-weight: 400;
      color: #fff;
    }
  }
`
