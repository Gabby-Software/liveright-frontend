import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  padding-top: 2rem;

  .ci-items {
    &__title {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('secondary2_v2')};
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    &__title-divider {
      flex: 1;
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-left: 1rem;
    }

    &__summary {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1rem;
    }

    &__item {
      display: flex;
      justify-content: space-between;
      font-weight: 400;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      color: ${getColorCarry('secondary4_v2')};

      &_bold {
        font-weight: 700;

        & .ci-items__value {
          font-weight: 700;
        }
      }
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 1rem;
    }

    &__value {
      color: ${getColorCarry('primary_v2')};
    }
  }
`
