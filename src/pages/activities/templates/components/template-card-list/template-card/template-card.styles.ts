import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export default styled(Card)`
  color: ${getColorCarry('neutral_70')};
  margin-bottom: 15px;

  .card-id {
    font-size: 14px;
    line-height: 20px;
  }

  .card-name {
    font-weight: bold;
    font-size: 18px;
    line-height: 26px;
    margin: 8px 0;
  }

  .card-tabular-data {
    margin-top: 8px;

    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      line-height: 20px;
      padding: 4px 0;
    }

    &__label {
      color: ${getColorCarry('neutral_60')};
      font-weight: normal;
    }
  }
`
