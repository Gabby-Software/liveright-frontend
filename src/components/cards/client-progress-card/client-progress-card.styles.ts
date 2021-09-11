import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'
import Card from '../../card/card.style'

export const Styles = styled(Card)`
  width: 100%;
  padding: 1rem;
  background-color: ${getColorCarry('neutral_10')};
  border: 1px solid ${getColorCarry('background_v2')};

  .client-progress-card {
    &__header {
      display: flex;
      align-items: center;

      &-content {
        flex: 1;
      }

      &-name {
        font-size: 1rem;
        font-weight: 500;

        &-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      &-link {
        padding: 0 0.25rem;
        height: auto;
        font-weight: 400;
        font-size: 0.75rem;

        & svg {
          margin-left: 0.5rem;
        }
      }

      &-subtitle {
        font-size: 0.75rem;
        font-weight: 400;
        color: ${getColorCarry('secondary2_v2')};

        & span {
          color: ${getColorCarry('primaryDark_v2')};
        }
      }
    }
  }
`
