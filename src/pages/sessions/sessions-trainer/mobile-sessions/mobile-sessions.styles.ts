import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const TitleContent = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default styled.div`
  display: flex;
  flex-direction: column;

  .sessions {
    &__tabs {
      position: relative;
      top: -25px;

      & .ant-tabs-tab {
        max-width: 33%;
        white-space: normal;
        text-align: center;
      }
    }

    &__options {
      display: flex;
      justify-content: space-between;
      padding-top: 1.25rem;
    }

    &__doc-btn {
      color: ${getColorCarry('orange_60')};
      &:hover,
      &:focus {
        color: ${getColorCarry('orange_60')};
      }
    }

    &__progress {
      display: flex;
      flex-direction: column;
      margin-top: 2.875rem;
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &__client-filter-container {
      margin-bottom: 1.5rem;
    }

    &__schedule-card {
      margin-bottom: 0.75rem;
    }

    &__schedule-card-btn {
      margin-top: 1.25rem;
      padding: 0 0.25rem;

      & svg {
        margin-left: 0.75rem;
      }
    }

    &__awaiting {
      margin-bottom: 2.625rem;
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
    }

    &__progress-range-container {
      margin-bottom: 1.25rem;
    }

    &__manage-btn {
      margin: 1.875rem 0 0 0;
    }

    &__title {
      margin: 1.625rem 0 1.5rem 0;
    }

    &__cards-container {
      margin-top: 1.25rem;
    }
  }
`
