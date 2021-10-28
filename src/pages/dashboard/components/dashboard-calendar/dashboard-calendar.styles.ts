import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  grid-area: 1 / 1 / 2 / 2;
  .dashboard-calendar {
    &__btn {
      font-weight: 400;
      width: 100%;
      border-color: ${getColorCarry('neutral_30')};
      color: ${getColorCarry('secondary2_v2')};

      & svg {
        margin-right: 0.5rem;
      }

      &-wrapper {
        width: 100%;
      }
    }

    &__link {
      color: ${getColorCarry('link')};
      font-size: 1rem;
    }

    &__title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__calendar {
      padding-bottom: 1rem;

      & .rbc-time-view {
        max-height: 400px;
        overflow-y: scroll;
        margin: 0 -1.75rem;
        padding: 0 1.75rem;
      }

      & .rbc-row.rbc-time-header-cell.rbc-time-header-cell-single-day {
        display: none;
      }

      & .rbc-day-slot.rbc-time-column.rbc-now.rbc-today {
        border-right: 0;
      }

      & .rbc-day-slot {
        border-right: 0;
      }

      & .rbc-timeslot-group {
        &::before {
          display: none;
        }
        &::after {
          display: none;
        }
      }
      & .rbc-time-gutter.rbc-time-column {
        border-right: 0;
      }
      & .rbc-time-header .rbc-allday-cell .rbc-row-bg .rbc-day-bg:first-child {
        border-left: 0;
      }
      & .rbc-time-header {
        grid-template-columns: 60px 1fr;
      }
      &.big-calendar_day .rbc-time-content {
        grid-template-columns: 60px 1fr;
      }
      & .rbc-time-gutter .rbc-timeslot-group .rbc-label {
        top: -12px;
        color: ${getColorCarry('primaryDark_v2')};
      }
      & .rbc-day-slot .rbc-events-container .rbc-event {
        &.big-calendar__event-session {
          background-color: ${getColorCarry('red_40')};
        }
      }
    }

`
