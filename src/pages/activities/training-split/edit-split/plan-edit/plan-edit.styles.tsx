import styled from 'styled-components'

import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .PlanEdit {
    &__block {
      background-color: ${getColorCarry('white')};
      border-radius: 10px;
      padding: 24px;

      &:not(last-child) {
        margin-bottom: 16px;
      }

      & .subtitle {
        margin: 8px 0;
      }
    }

    &__flex {
      display: flex;
      gap: 8px;
      margin: 16px 0;

      & .toggle {
        margin: 0 16px 0 0;

        &__body {
          margin: 0;
        }
      }
    }

    &__days {
      margin: 16px 0;

      &-container {
        font-size: 0.875rem;

        & .day-item {
          color: ${getColorCarry('neutral_100')};
          padding: 8px;
          background-color: ${getColorCarry('neutral_30')};
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 16px;

          & svg {
            color: ${getColorCarry('neutral_70')};
          }

          &:not(last-child) {
            margin-right: 16px;
          }

          & button {
            padding: 0;
            height: 14px;
          }
        }
      }
    }

    &__add {
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      color: ${getColorCarry('neutral_70')};
      border: 1px dashed ${getColorCarry('neutral_50')};
      border-radius: 10px;
      cursor: pointer;
      margin: 16px 0;

      & svg {
        margin-right: 0.5rem;
      }
    }

    &__actions {
      border-top: 1px solid ${getColorCarry('neutral_40')};
      display: flex;
      justify-content: flex-end;
      padding: 24px;
      padding-bottom: 0;
      margin: 24px -24px;
    }
  }
`
