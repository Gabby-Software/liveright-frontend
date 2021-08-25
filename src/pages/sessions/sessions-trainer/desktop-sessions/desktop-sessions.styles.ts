import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  display: flex;
  overflow: auto;

  .sessions {
    width: 100%;
    display: flex;

    &__title {
      display: flex;
      justify-content: space-between;
    }

    .carousel__cont {
      padding: 16px;
    }

    &__options {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
    }

    &__progress {
      display: flex;
      flex-direction: column;
    }

    &__main {
      flex: 1;
      padding: 0 2.25rem 103px 2.25rem;
    }

    &__right {
      width: 349px;
      padding: 0 2.25rem;
      overflow: hidden;
      border-left: 1px solid
        ${(props) => props.theme.vars.colors.inputBorder_v2};
    }

    &__filter-form-wrapper {
      padding-bottom: 1.5rem;
      border-bottom: 1px solid
        ${(props) => props.theme.vars.colors.inputBorder_v2};
      margin-bottom: 1.5rem;
      display: flex;

      & .select_input__wrapper {
        max-width: 253px;
      }
    }

    &__cards-grid {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0.875rem;
    }

    &__schedule_button {
      margin-top: 2.375rem;
      padding: 0 0.25rem;
      width: max-content;
      color: ${(props) => props.theme.vars.colors.link};
      cursor: pointer;

      & svg {
        margin-left: 0.75rem;
      }
    }

    &__date-range {
      margin-bottom: 1.875rem;
    }

    &__right-footer {
      padding: 2.125rem 0;
    }

    &__manage-btn {
      width: 100%;
    }

    &__row-doc-btn {
      color: ${getColorCarry('orange_60')};
      margin: 0 0.5rem;
    }

    &__row-remove-btn {
      color: ${getColorCarry('primary_v2')};
    }

    &__table {
      width: auto;
      margin: 0 -1.75rem;
    }

    &__filter-search,
    &__filter-select {
      margin-right: 0.75rem;
    }

    &__filter-search {
      width: 100%;
      max-width: 320px;
    }

    &__filter-select {
      width: 100%;
      max-width: 200px;
    }

    &__awaiting-filter {
      width: 100%;
      max-width: 253px;
      margin-right: 1rem;
    }

    &__filter-col {
      display: flex;

      &_form {
        flex: 1;
      }
    }

    &__filter-calendar-btn {
      font-weight: 500;

      & svg {
        margin-right: 0.25rem;
      }
    }
  }
`
