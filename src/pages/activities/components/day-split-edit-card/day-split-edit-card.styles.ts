import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  .DaySplitEditCard {
    &__control {
      margin-bottom: 1.25rem;

      &:last-child {
        margin-bottom: 0;
      }

      &-head {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      &-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        width: 24px;
        height: 24px;
        margin-right: 0.5rem;
        color: #fff;

        &[data-type='training'] {
          background-color: ${getColorCarry('orange_50')};
        }

        &[data-type='diet'] {
          background-color: ${getColorCarry('primary_v2')};
        }

        &[data-type='other'] {
          background-color: ${getColorCarry('blue_40')};
        }

        & svg {
          width: 14px;
          height: 14px;
        }
      }

      &-title {
        font-size: 1rem;
        font-weight: 500;
        color: ${getColorCarry('neutral_70')};
      }
    }
  }
`
