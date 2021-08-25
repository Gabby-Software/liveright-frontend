import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.div`
  .reschedule-session {
    &__form-item {
      margin-bottom: 1.25rem;
    }

    &__submit-btn {
      width: 100%;
    }

    &__current {
      width: 100%;
      display: flex;
      background-color: ${getColorCarry('primaryDark_v2')};
      border-radius: 10px;
      color: #fff;
      padding: 1.25rem 0;
      margin-bottom: 1.875rem;
    }

    &__current-item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid ${getColorCarry('neutral_50')};

      &:last-child {
        border-right: 0;
      }
    }

    &__current-item-title {
      color: ${getColorCarry('neutral_50')};
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    &__current-item-value {
      font-size: 1.125rem;
      font-weight: 700;
      line-height: 1.5rem;
    }

    &__current-item-container {
      margin-left: 1.875rem;
    }
  }
`
