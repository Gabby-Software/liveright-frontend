import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Wrapper = styled.div`
  padding: 0 0 4.5rem 0;

  .progress {
    &__title {
      font-size: 2rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};

      &-container {
        margin-bottom: 3rem;
        margin-top: 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .progress__header-btn {
    padding: 0 1rem;

    & svg {
      margin-left: 1rem;
    }
  }
`
