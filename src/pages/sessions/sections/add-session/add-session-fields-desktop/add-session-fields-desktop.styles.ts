import styled from 'styled-components'

import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .add-session {
    &__form-card {
      flex: 1;
    }

    &__form-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 1.25rem;
    }

    &__form-grid {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
    }

    &__submit-btn {
      width: 100%;
    }

    &__form-item {
      margin-bottom: 1.875rem;
    }

    &__delete-btn {
      width: 100%;
      margin-top: 1.25rem;
    }

    &__type-wrapper {
      width: 100%;
      position: relative;
    }

    &__want-change {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: -1.5rem;
      font-size: 0.75rem;
      color: ${getColorCarry('primaryDark_v2')};

      & svg {
        margin-left: 0.5rem;

        &:hover {
          color: ${getColorCarry('primary_v2')};
        }
      }
    }
  }
`
