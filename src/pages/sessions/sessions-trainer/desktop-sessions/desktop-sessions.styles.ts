import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const ScheduleCard = styled(Card)`
  padding: 31px 28px 28px 28px;
  background-color: ${(props) => props.theme.vars.colors.neutral_10};
  border: 1px solid ${(props) => props.theme.vars.colors.background_v2};
`

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

    &__tabs {
      & .ant-tabs-nav {
        background-color: #fff;
        padding: 0 1.75rem;
        border-radius: 10px;
        margin-bottom: 2.125rem;
      }
      & .ant-tabs-tab {
        padding: 17px 0;
        font-size: 0.875rem;

        &:hover {
          color: ${(props) => props.theme.vars.colors.blue_70};
        }
      }
      & .ant-tabs-tab-active .ant-tabs-tab-btn {
        text-shadow: none;
        font-weight: 700;
        color: ${(props) => props.theme.vars.colors.blue_70};
      }
      & .ant-tabs-tab-btn {
        transition: none;
      }
      & .ant-tabs-ink-bar {
        background-color: ${(props) => props.theme.vars.colors.blue_70};
      }
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
