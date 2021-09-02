import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  padding-bottom: 2rem;

  .profile {
    &__card {
      margin-bottom: 1.875rem;

      &-title {
        font-size: 1.125rem;
        font-weight: 700;
        color: ${getColorCarry('primaryDark_v2')};
        margin-bottom: 1.25rem;
      }

      &_row {
        flex-direction: row;
      }
    }

    &__card-dark {
      background-color: ${getColorCarry('primaryDark_v2')};
      max-width: 300px;
      margin-right: 1.25rem;

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

    &__preview {
      display: flex;
      align-items: center;

      &-img {
        width: 100px;
        height: 100px;
        border-radius: 9999px;
        margin-right: 1.25rem;
        border: none;
        background-color: ${getColorCarry('primary_v2')};
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        & span {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
        }

        & img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }

      &-name {
        font-size: 1.375rem;
        font-weight: 700;
        color: ${getColorCarry('primaryDark_v2')};
      }

      &-sub {
        font-size: 1.125rem;
        font-weight: 400;
        color: ${getColorCarry('dark_v2')};
      }
    }

    &__action {
      padding-left: 2rem;
      border-left: 1px solid ${getColorCarry('inputBorder_v2')};
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
