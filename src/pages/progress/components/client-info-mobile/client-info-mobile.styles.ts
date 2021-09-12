import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  margin-top: -3rem;
  margin-bottom: 1.25rem;

  .progress {
    &__client-card {
      &-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-expand {
        & svg {
          width: 20px;
        }
      }

      &-badge {
        display: flex;
        align-items: center;
      }

      &-link {
        margin-left: 0.5rem;
      }

      &-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 1.25rem;
      }

      &-switch {
        padding: 0;
      }

      &-info {
        padding: 0.625rem 0 1.25rem 0;
        border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};
      }

      &-text {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('dark_v2')};
        margin-bottom: 0.625rem;

        &:last-child {
          margin-bottom: 0;
        }

        & span {
          color: ${getColorCarry('primaryDark_v2')};
        }
      }
    }
  }
`
