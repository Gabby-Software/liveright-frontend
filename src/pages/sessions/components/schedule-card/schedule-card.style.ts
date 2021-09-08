import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  padding: 31px 28px 28px 28px;
  background-color: ${getColorCarry('neutral_10')};
  border: 1px solid ${getColorCarry('background_v2')};
  justify-content: space-between;

  @media (${mediaQueries.MOBILE}) {
    padding: 1.5rem 1.25rem;
  }

  .schedule-card {
    &__title {
      font-size: 0.75rem;
      font-weight: 400;
      color: ${getColorCarry('secondary2_v2')};
      margin-bottom: 0.75rem;
    }

    &__subtitle {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('secondary4_v2')};
      margin-bottom: 1rem;

      & svg {
        margin-right: 0.5rem;
      }
    }

    &__from-to {
      &-container {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }

      &-item {
        display: flex;
        flex-direction: column;
      }

      &-title {
        font-size: 0.75rem;
        font-weight: 400;
        color: ${getColorCarry('secondary2_v2')};
      }

      &-value {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('secondary4_v2')};

        &_dark {
          color: ${getColorCarry('primaryDark2_v2')};
        }
      }

      &-arrow {
        color: ${getColorCarry('neutral_50')};
        margin: 0 1rem;
      }
    }

    &__schedule_button {
      margin-top: 1rem;
      padding: 0 0.25rem;
      width: max-content;
      color: ${getColorCarry('link')};
      cursor: pointer;

      & svg {
        margin-left: 0.75rem;
      }
    }
  }
`
