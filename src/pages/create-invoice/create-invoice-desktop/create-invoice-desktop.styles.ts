import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const SubmitLabel = styled.div`
   margin-left: auto;
   text-align: right;
   max-width: 300px;
   .ant-btn {
        max-width: 300px;
        padding:0;
        &:first-child {
            margin-bottom: 24px;
        }
        label {
            cursor: pointer;
            display block;
            padding: 15px 30px;
        }
   }
`
export default styled.div`
  .add-invoice {
    &__title-container {
      margin-bottom: 1.5rem;
    }

    &__title {
      font-size: 1.375rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__subtitle {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark2_v2')};
    }

    &__card {
      padding: 2.625rem 3.25rem;
    }

    &__add-client {
      margin-left: -0.75rem;

      & svg {
        transform: translateY(-2px);
        margin-right: 0.5rem;
      }
    }

    &__form-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
    }

    &__cont {
      counter-reset: create-section;
    }

    &__submit {
      display: flex;
      justify-content: flex-end;
      padding: 1.5rem 0 4.25rem 0;
    }

    &__submit-btn {
      margin-right: 1.5rem;
    }
  }
`
