import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;

  .TSPlanDayEdit {
    &__block {
      background-color: ${getColorCarry('white')};
      border-radius: 10px;
      padding: 24px;
      margin-bottom: 1rem;

      @media ${mediaQueries.MOBILE} {
        margin: 0;
        margin-top: 1rem;
      }

      & .subtitle {
        margin: 8px 0;
      }

      & button.action {
        @media ${mediaQueries.MOBILE} {
          width: 100%;
        }
      }
    }

    &__flex {
      display: flex;
      gap: 8px;
      margin: 16px 0;
      flex-wrap: nowrap;
      overflow-x: auto;

      & .toggle {
        margin: 0 16px 0 0;

        &__body {
          margin: 0;
        }
      }

      &-wrap {
        display: flex;
        gap: 8px;
        margin: 16px 0;

        @media ${mediaQueries.MOBILE} {
          flex-direction: column;
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

  .mobile-page__content {
    & TSPlanDayEdit {
    }
  }
`
