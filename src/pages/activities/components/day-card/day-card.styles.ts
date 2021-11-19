import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  border: 1px solid ${getColorCarry('inputBorder_v2')};

  .day-card {
    &__title {
      font-size: 1.375rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;

      &-icon {
        color: ${getColorCarry('secondary2_v2')};
        width: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`
