import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;

  .sessions {
    width: 100%;

    &__main {
      padding: 0 2.25rem 3rem 2.25rem;
    }

    &__options {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__subtitle {
      padding: 2rem 0 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &_past {
        padding: 3.25rem 0 1.25rem 0;
      }
    }

    &__table {
      width: auto;
      margin: -1.5rem -1.75rem 0 -1.75rem;
    }

    &__table-card {
      overflow-x: hidden;
    }

    &__calendar-btn {
      font-weight: 500;

      & svg {
        margin-right: 0.25rem;
      }
    }

    &__row-doc-btn {
      color: ${getColorCarry('orange_60')};
      margin: 0 0.5rem;
    }

    &__row-options-btn {
      color: ${getColorCarry('secondary2_v2')};
    }

    &__filters-form {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }

    &__filters-type {
      width: 100%;
      max-width: 200px;
      margin-right: 0.75rem;
    }

    &__filters-search {
      width: 100%;
      max-width: 320px;
    }
  }
`
