import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  margin-bottom: 2rem;

  .chart {
    &__title {
      font-size: 1.125rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};
      align-items: center;
      justify-content: space-between;

      &-container {
        margin-bottom: 2rem;
      }
    }

    &__chart {
      &-container {
        width: auto;
        margin-left: -1.75rem;
      }
    }
  }
`
