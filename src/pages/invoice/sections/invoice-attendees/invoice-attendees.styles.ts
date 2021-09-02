import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  .invoice__title {
    font-size: 1.375rem;
    font-weight: 700;
    color: ${getColorCarry('primary_v2')};
    margin-bottom: 1.25rem;
  }

  .invoice__header-actions {
    width: 100%;
    max-width: 250px;
  }

  .invoice__header-badge {
    margin-bottom: 1rem;
    height: 44px;
  }

  .invoice__header-btn {
    margin-bottom: 1.25rem;
    width: 100%;
  }

  .invoice__header-container {
    display: flex;
    justify-content: space-between;
  }

  .invoice__header-info {
    width: 50%;
  }

  .invoice__header-links {
    display: flex;
    justify-content: space-between;
  }

  .invoice__row {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;

    &_col-4 {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  .invoice-divider {
    width: 100%;
    height: 1px;
    background-color: ${getColorCarry('inputBorder_v2')};
    margin: 1.25rem 0;
  }

  .invoice__table-container {
    width: auto;
    margin: 1.5rem -1.75rem 2rem -1.75rem;
  }

  .invoice-info-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .invoice__table {
    border-radius: 0;

    & .data-table__th {
      padding-top: 0.625rem;
      padding-bottom: 0.625rem;

      & svg {
        display: none;
      }
    }

    & .data-table__td {
      border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};
    }
  }

  .invoice-text-item {
    &__name {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('dark_v2')};
      margin-bottom: 0.25rem;
      line-height: 1.25rem;

      &_dark {
        color: ${getColorCarry('primaryDark_v2')};
      }
    }
    &__value {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 0.25rem;
      line-height: 1.25rem;

      &_red {
        font-weight: 500;
        font-size: 1rem;
        color: ${getColorCarry('primary_v2')};
      }
    }
    &__sub {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('secondary2_v2')};
      margin-bottom: 0.25rem;
      line-height: 1.25rem;
    }
  }

  .invoice__footer {
    padding-top: 1.25rem;
    border-top: 1px solid ${getColorCarry('inputBorder_v2')};
    margin-top: 6.25rem;

    &-text {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.25rem;
      color: ${getColorCarry('secondary2_v2')};

      & span {
        color: ${getColorCarry('primaryDark_v2')};
      }
    }
  }

  .invoice__send-btn {
    width: 100%;
    margin-bottom: 1rem;
  }
`
