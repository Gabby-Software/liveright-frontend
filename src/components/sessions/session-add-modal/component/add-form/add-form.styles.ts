import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'
import Card from '../../../../cards/card/card.component'

export default styled(Card)`
  flex: 1;
  
  .add-session {
    &__credits-btn {
      width: 100%;
      margin-bottom: 1.875rem;
    }

    &__title {
      font-size: 1.125rem;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 1.25rem;
    }

    &__subtitle {
      margin-bottom: 1.875rem;
      font-size: 1rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};

      @media ${mediaQueries.MOBILE} {
        font-size: 0.875rem;
        text-align: left;
      }
    }

    &__form-item {
      margin-bottom: 1.25rem;
    }

    &__submit-btn {
      width: 100%;
    }
  }
`
