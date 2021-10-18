import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export default styled(Card)`
  align-items: center;
  background-color: ${getColorCarry('primaryDark_v2')};
  display: flex;
  justify-content: center;
  align-items: center;

    .card {
      &__name {
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
        margin: 10px 0;
      }

      &__joinedAt {
        font-weight: normal;
        font-size: 10px;
        line-height: 16px;
        color: ${getColorCarry('neutral_50')};
        opacity: 0.6;
        margin: 2px 0;
      }
    
      &__account_link {
        text-decoration: none;
        font-size: 12px;
        line-height: 16px;
        color: ${getColorCarry('blue_70')};
        margin-top: 8px;
      }
    }
  }
`
