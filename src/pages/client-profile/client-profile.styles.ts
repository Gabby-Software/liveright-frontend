import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  padding-bottom: 2rem;

  .profile {
    &__card-dark {
      background-color: ${getColorCarry('primaryDark_v2')};
      width: 100%;
      max-width: 300px;
      margin-right: 1.25rem;

      &-wrapper {
        display: block;
      }

      &-title {
        font-size: 1rem;
        font-weight: 500;
        color: #fff;
        margin-bottom: 0.625rem;
        display: flex;
        align-items: center;

        & svg {
          margin-right: 0.5rem;
        }
      }

      &-sub {
        font-size: 0.875rem;
        font-weight: 400;
        color: #fff;
        margin-bottom: 0.625rem;
      }

      &-btn {
        width: fit-content;
        padding: 0;
        color: #fff;
        font-weight: 500;

        & svg {
          margin-left: 0.5rem;
        }
      }
    }

    &__grid {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-column-gap: 1rem;
      grid-row-gap: 1.5rem;

      &-item {
        &-name,
        &-value {
          font-weight: 400;
          font-size: 0.875rem;
          color: ${getColorCarry('secondary2_v2')};
          line-height: 1.25rem;
          margin-bottom: 0.25rem;
        }
        &-value {
          color: ${getColorCarry('primaryDark_v2')};
        }
      }
    }
  }
`
