import styled from 'styled-components'

import Card from '../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled(Card)`
  counter-increment: create-section;
  margin-bottom: 1rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .ci-preview__details {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;
    font-size: 0.875rem;
    font-weight: 400;
    color: ${getColorCarry('secondary2_v2')};

    &__value {
      color: ${getColorCarry('primaryDark_v2')};
      font-weight: 700;
    }
  }

  .ci-preview__row {
    display: flex;
    margin-bottom: 1rem;
  }
`
