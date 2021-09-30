import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled(Card)`
  margin-bottom: 1rem;
  .session-card {
    &__container {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__info {
      padding-right: 1rem;
    }

    &__date {
      background-color: ${getColorCarry('red_10')};
      border-radius: 8px;
      color: ${getColorCarry('red_80')};
      font-weight: 500;
      font-size: 1rem;
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      min-width: max-content;

      @media ${mediaQueries.TABLET} {
        font-size: 0.75rem;
      }
    }

    &__title {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    &__date-item {
      display: flex;
      align-items: center;

      & svg {
        margin-left: 1rem;

        @media ${mediaQueries.TABLET} {
          margin-left: 0.5rem;
        }
      }
    }
  }
`
