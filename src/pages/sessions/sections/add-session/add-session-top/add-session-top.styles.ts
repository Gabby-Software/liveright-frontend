import styled from 'styled-components'

import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  .add-session {
    &__client-select {
      margin-bottom: 1.875rem;

      & .ant-select-selector {
        padding: 1rem 1rem 1rem 4rem;
        height: auto;
      }

      & .select__prefix {
        left: 1.5rem;
      }

      & .ant-select-arrow {
        right: 1.5rem;
      }
    }

    &__head {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.875rem;
      margin-bottom: 1.875rem;
    }

    &__head-card {
      padding: 1rem;
      align-items: center;
      justify-content: center;
    }

    &__credit-btn {
      width: 100%;
      color: ${getColorCarry('secondary2_v2')};
      height: 100%;

      & .credits-btn__count {
        color: ${getColorCarry('primaryDark_v2')};
      }

      & .credits-btn__items {
        & svg {
          color: ${getColorCarry('primaryDark_v2')};
        }
      }
    }
  }
`
