import styled from 'styled-components'

import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  .ci-items {
    &__summary {
      margin-top: 1rem;
      padding-top: 1.25rem;
      border-top: 1px solid ${getColorCarry('inputBorder_v2')};

      &-title {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('secondary2_v2')};
        margin-bottom: 1rem;
      }

      &__item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }
      &__label {
        font-weight: 400;
        color: ${getColorCarry('secondary4_v2')};
        font-size: 0.875rem;
      }
      &__value {
        font-weight: 400;
        color: ${getColorCarry('primary_v2')};
        font-size: 0.875rem;
      }
    }

    &__divider {
      margin-bottom: 1rem;
    }
  }

  & .add-invoice__add-btn {
    padding: 0;

    & svg {
      margin-right: 0.5rem;
    }
  }
`
