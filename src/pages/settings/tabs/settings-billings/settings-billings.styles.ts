import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled(Card)`
  margin: 20px 0;

  .divider {
    border: 1px solid ${getColorCarry('neutral_30')};
    margin: 10px 0;
  }

  .billings {
    &__title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &__heading {
        font-weight: bold;
        font-size: 22px;
        line-height: 32px;
        color: ${getColorCarry('neutral_100')};
      }

      &__add-link {
        font-size: 18px;
        text-decoration: underline;
      }
    }

    &__cards {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
    }
  }
`
