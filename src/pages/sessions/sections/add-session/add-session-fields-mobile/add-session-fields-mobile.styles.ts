import styled from 'styled-components'

import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  .add-session {
    &__title {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 1.25rem;
    }

    &__form-date {
      margin-bottom: 0.75rem;
    }

    &__toggle-calendar-btn {
      padding: 0;

      & svg {
        margin-right: 0.625rem;
      }
    }

    &__calendar-wrapper {
      margin-bottom: 1.25rem;
    }

    &__form-item {
      margin-bottom: 0.75rem;
    }

    &__form-notes {
      margin-bottom: 1.25rem;
    }

    &__submit-btn {
      width: 100%;
      margin-top: 1rem;
    }

    &__delete-btn {
      width: 100%;
      margin-top: 1.25rem;
    }

    &__form-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__want-change {
      margin-bottom: 1.25rem;
      font-size: 0.75rem;
      display: flex;
      align-items: center;

      & svg {
        width: 20px;
        height: 20px;
        margin-left: 0.5rem;
      }
    }
  }
`
