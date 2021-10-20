import styled from 'styled-components'

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

      &:nth-child(2) {
        & .rbc-row-content .rbc-row {
          border-top: 1px solid ${getColorCarry('neutral_30')};
        }
      }

      &:last-child {
        & .rbc-row-content .rbc-row {
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;

          & .rbc-date-cell {
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
        position: absolute;
        bottom: 0;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      }

      & .rbc-row-content {
        & .rbc-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          border-bottom: 1px solid ${getColorCarry('neutral_30')};

          & .rbc-date-cell {
            aspect-ratio: 16 / 9;
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

            &::before {
              content: '';
              position: absolute;
              left: -1px;
              bottom: 0;
              width: 1px;
              height: 20px;
              background-color: ${getColorCarry('neutral_30')};
            }

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
        aspect-ratio: 16 / 9;
        border-bottom: 1px solid ${getColorCarry('neutral_30')};

        &:first-child {
          border-top: 1px solid ${getColorCarry('neutral_30')};
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
        }
      }
    }

    & .rbc-time-content {
      display: grid;
      grid-template-columns: 85px 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

export const DateCellWrapperStyles = styled.div`
  padding: 0.5rem;
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
