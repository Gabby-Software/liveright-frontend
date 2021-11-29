import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  .day-tp-card {
    &__name {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};

      &-container {
        display: flex;
        align-items: center;
        margin-bottom: 1.25rem;
      }

      &-icon {
        width: 34px;
        height: 34px;
        border-radius: 9999px;
        background-color: ${getColorCarry('primary_v2')};
        margin-right: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
      }
    }

    &__content {
      padding-left: calc(34px + 1rem);
    }

    &__workout {
      &-title {
        font-size: 0.875rem;
        font-weight: 700;
        color: ${getColorCarry('primaryDark_v2')};
        margin-bottom: 0.25rem;
      }
    }
  }
`
