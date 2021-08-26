import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  margin-top: -2.5rem;

  .reschedule-session {
    &__date-card {
      background-color: #fff;

      & svg {
        color: ${getColorCarry('dark_v2')};
      }

      & .current-date-card__item-container {
        margin-left: 1rem;
      }

      & .current-date-card__item-title {
        color: ${getColorCarry('secondary2_v2')};
      }

      & .current-date-card__item-value {
        color: ${getColorCarry('primaryDark_v2')};
      }
    }
  }
`
