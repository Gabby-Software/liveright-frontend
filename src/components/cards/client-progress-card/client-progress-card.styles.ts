import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../pipes/theme-color.pipe'
import Card from '../../card/card.style'

export const Styles = styled(Card)`
  width: 100%;
  padding: 1rem;
  background-color: ${getColorCarry('neutral_10')};
  border: 1px solid ${getColorCarry('background_v2')};

  .client-progress-card {
    &__avatar {
      & .user-badge__preview {
        @media ${mediaQueries.MOBILE} {
          width: 40px;
          height: 40px;
        }
      }
    }

    &__header {
      display: flex;
      align-items: center;

      &-content {
        flex: 1;
      }

      &-name {
        font-size: 1rem;
        font-weight: 500;

        @media ${mediaQueries.MOBILE} {
          font-size: 0.875rem;
        }

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

        @media ${mediaQueries.MOBILE} {
          font-size: 0.625rem;
        }
      }

      &-subtitle {
        font-size: 0.75rem;
        font-weight: 400;
        color: ${getColorCarry('secondary2_v2')};

        & span {
          color: ${getColorCarry('primaryDark_v2')};
        }

        @media ${mediaQueries.MOBILE} {
          font-size: 0.625rem;
        }
      }
    }
  }
`
