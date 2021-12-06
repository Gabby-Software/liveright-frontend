import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  .day-tp-card {
    &__content {
      //padding-left: calc(34px + 1rem);
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
