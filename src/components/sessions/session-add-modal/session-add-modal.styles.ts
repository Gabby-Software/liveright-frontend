import styled from 'styled-components'

import Card from '../../../components/cards/card/card.component'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled(Card)`
  .add-session {
    &__credits-btn {
      width: 100%;
    }

    &__title {
      margin: 1.875rem 0;
      font-size: 1rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__form-item {
      margin-bottom: 1.25rem;
    }

    &__submit-btn {
      width: 100%;
    }
  }
`
