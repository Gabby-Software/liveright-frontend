import styled, { css } from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'
import Card from '../cards/card/card.component'

export const Styles = styled(Card)`
  box-shadow: 0 0 40px rgba(230, 45, 71, 0.03);
  padding: 0;

  .big-calendar {
    // month
    & .rbc-month-header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      border-left: 1px solid ${getColorCarry('neutral_30')};
      border-right: 1px solid ${getColorCarry('neutral_30')};

      & .rbc-header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.875rem 0;
        font-size: 0.875rem;
      }
    }

    & .rbc-month-row {
      position: relative;
      display: grid;
      grid-template-rows: auto 1fr;
      border-bottom: 1px solid ${getColorCarry('neutral_30')};
      height: auto;
      min-height: 6vw;

      &:nth-child(2) {
        & .rbc-row-content .rbc-row {
          border-top: 1px solid ${getColorCarry('neutral_30')};
        }
      }

      &:last-child {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        & .rbc-row-bg {
          & .date-cell-wrapper {
            &:first-child {
              border-bottom-left-radius: 9px;
            }

            &:last-child {
              border-bottom-right-radius: 9px;
            }
          }
        }
      }

      & .rbc-row-bg {
        grid-row: 2;
        width: 100%;
        display: grid;
        grid-template-columns:
          minmax(auto, 14.25%) minmax(auto, 14.25%) minmax(auto, 14.25%)
          minmax(auto, 14.25%) minmax(auto, 14.25%) minmax(auto, 14.25%) minmax(auto, 14.25%);
      }

      & .rbc-row-content {
        & .rbc-row {
          display: grid;
          grid-template-columns:
            minmax(auto, 14.25%) minmax(auto, 14.25%) minmax(auto, 14.25%)
            minmax(auto, 14.25%) minmax(auto, 14.25%) minmax(auto, 14.25%) minmax(auto, 14.25%);
          height: 100%;

          & .rbc-date-cell {
            height: 100%;
            border-right: 1px solid ${getColorCarry('neutral_30')};
            padding: 0.5rem;
            display: flex;
            justify-content: flex-end;
            font-size: 0.875rem;
            font-weight: 400;
            color: ${getColorCarry('neutral_70')};

            &:first-child {
              border-left: 1px solid ${getColorCarry('neutral_30')};
            }

            &.rbc-off-range {
              & * {
                opacity: 0.4;
              }
            }

            & a {
              color: inherit;
              width: 30px;
              height: 30px;
              border-radius: 9999px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            &.rbc-now {
              border: 1px solid ${getColorCarry('primary_v2')};
              margin: -1px 0 -1px -1px;
              border-bottom: 0;

              & a {
                background-color: ${getColorCarry('primary_v2')};
                color: #fff;
              }
            }
          }
        }
      }
    }

    //week
    & .rbc-time-header {
      display: grid;
      grid-template-columns: 85px 1fr;
      padding-bottom: 1rem;

      & .rbc-time-header-content {
        & .rbc-time-header-cell {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

          & .rbc-header {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem 0;
            font-size: 0.875rem;
            font-weight: 400;
            color: ${getColorCarry('primaryDark_v2')};
            white-space: pre-wrap;
            text-align: center;
            position: relative;

            & a {
              color: inherit;
              white-space: pre-wrap;
            }

            &.rbc-today {
              & .week-header__num {
                background-color: ${getColorCarry('primary_v2')};
                color: #fff;
              }
            }
          }
        }
      }
    }

    & .rbc-time-gutter {
      display: flex;
      flex-direction: column;
      border-right: 1px solid ${getColorCarry('neutral_30')};

      & .rbc-timeslot-group {
        min-height: 75px;
        flex: 1;
        display: flex;
        justify-content: center;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 1px;
          background-color: ${getColorCarry('neutral_30')};
          top: -1px;
          right: 0;
        }

        & .rbc-label {
          position: absolute;
          top: -25px;
          right: 20px;
          color: ${getColorCarry('secondary2_v2')};
        }

        &:first-child {
          &::before {
            top: 0;
          }
        }
      }
    }

    & .rbc-day-slot {
      border-right: 1px solid ${getColorCarry('neutral_30')};
      position: relative;

      & .rbc-timeslot-group {
        height: auto;
        min-height: 6vw;
        border-bottom: 1px solid ${getColorCarry('neutral_30')};

        &:first-child {
          border-top: 1px solid ${getColorCarry('neutral_30')};
          position: relative;

          &::before {
            content: '';
            position: absolute;
            height: 20px;
            width: 1px;
            background-color: ${getColorCarry('neutral_30')};
            top: -20px;
            left: -1px;
          }
        }
      }

      & .rbc-current-time-indicator {
        position: absolute;
        width: 100%;
      }

      & .rbc-events-container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;

        & .rbc-event {
          position: absolute;
          width: calc(100% - 20px) !important;
          left: 10px !important;
          color: #fff;
          border-radius: 10px;
          background-color: ${getColorCarry('primary_v2')};
          padding: 0.625rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 500;

          & .rbc-event-content {
            overflow: hidden;
            display: -webkit-box;
            -moz-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }
      }
    }

    & .rbc-time-content {
      display: grid;
      grid-template-columns: 85px 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }

    &_day {
      & .rbc-time-content {
        grid-template-columns: 85px 1fr;
      }

      & .rbc-time-header {
        & .rbc-time-header-content {
          & .rbc-time-header-cell {
            grid-template-columns: 1fr;
          }
        }
      }
    }
  }
`

export const ToolbarStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: ${getColorCarry('neutral_10')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid ${getColorCarry('neutral_30')};
  padding: 0 1rem;

  .calendar-toolbar {
    &__label {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      margin: 0 0.5rem;
    }

    &__tabs {
      margin-left: -1rem;

      &.ant-tabs {
        height: 100%;
      }

      & .ant-tabs-nav {
        height: 100%;
        margin-bottom: 0;
        background-color: transparent;

        &::before {
          border-bottom: 0;
        }
      }
    }

    &__search {
      width: 265px;

      & .ant-input {
        font-size: 0.75rem;
      }

      & .ant-input-suffix {
        width: 20px;
        height: 20px;
        margin-top: 0.5rem;
      }
    }

    &__cell {
      display: flex;
      align-items: center;
    }

    &__next {
      & svg {
        transform: rotate(180deg);
      }
    }
  }
`

export const DateCellWrapperStyles = styled.div<any>`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-right: 1px solid ${getColorCarry('neutral_30')};

  &:first-child {
    border-left: 1px solid ${getColorCarry('neutral_30')};
  }

  ${(props) =>
    props.$now &&
    css`
      border: 1px solid ${getColorCarry('primary_v2')};
      margin: -1px 0 -1px -1px;
      border-top: 0;
      position: relative;
      z-index: 1;
    `}

  .date-cell-wrapper {
    &__event {
      font-size: 0.75rem;
      font-weight: 400;
      position: relative;
      padding-left: 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.25rem;

      &::before {
        content: '';
        width: 12px;
        height: 12px;
        border-radius: 9999px;
        position: absolute;
        left: 0;
        background-color: ${getColorCarry('green_20')};
      }

      &[data-event-type='invoices'] {
        &::before {
          background-color: ${getColorCarry('blue_40')};
        }
      }
      &[data-event-type='sessions'] {
        &::before {
          background-color: ${getColorCarry('red_40')};
        }
      }

      &-time {
        color: ${getColorCarry('neutral_70')};
        margin-left: 0.25rem;
      }
    }
  }
`

export const WeekHeaderStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .week-header {
    &__num {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 9999px;
    }
  }
`