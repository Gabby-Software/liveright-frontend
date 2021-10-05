import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .add-session {
    &__form-title {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 1.25rem;
    }

    &__calendar-current {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }

    &__calendar-today {
      font-size: 1rem;
      display: block;
      padding: 0.2rem 0.75rem;
      border: 1px solid ${getColorCarry('link')};
      color: ${getColorCarry('link')};
      border-radius: 10px;
      position: absolute;
      font-weight: 500;
      left: 0;
    }

    &__calendar-current-day {
      width: 40px;
      height: 40px;
      background-color: ${getColorCarry('link')};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 9999px;
      color: #fff;
      font-size: 1.125rem;
      font-weight: 700;
    }

    &__calendar-current-weekday {
      color: ${getColorCarry('secondary2_v2')};
      font-size: 1rem;
    }

    &__calendar-nav {
      display: flex;
      justify-content: center;
      margin-bottom: 0.5rem;
      position: relative;
      align-items: center;
    }

    &__calendar-nav-date {
      font-size: 1.125rem;
      color: #000;
      display: flex;
      align-items: center;

      & svg {
        width: 20px;
        height: 20px;
        margin: 1rem;

        &:last-child {
          transform: rotate(180deg);
        }

        @media ${mediaQueries.TABLET} {
          margin: 1rem 0.25rem;
        }
      }
    }

    &__calendar-nav-divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin-bottom: 1rem;
    }
  }
`

export const CalendarWrapper = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  padding-top: 2rem;

  .add-session__calendar {
    &-divider {
      position: absolute;
      height: calc(100% - 75px);
      width: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      left: 3rem;
      top: 1rem;
    }

    &__item {
      height: 100%;
      min-height: 80px;
      border-top: 1px solid ${getColorCarry('inputBorder_v2')};
      padding: 6px;
      position: relative;
      margin-left: 2.5rem;
    }
    &__time {
      color: ${getColorCarry('secondary2_v2')};
      font-size: 0.875rem;
      position: absolute;
      left: -2.5rem;
      top: -1.5rem;
    }
    &__event {
      position: absolute;
      right: 0;
      width: 70%;
      border-radius: ${(p) => p.theme.vars.sizes.borderRadius};
      background-color: ${getColorCarry('blue_50')};
      color: black;
      padding: 0px 12px;
      display: flex;
      font-weight: 600;
      align-items: center;
      z-index: 1;

      &__overlap {
        background-color: ${getColorCarry('blue_50')};
        color: #fff;
      }
      &__current {
        background-color: ${getColorCarry('red_40')};
        color: #fff;
        z-index: 3;
        left: 60px;
      }
      &__suggested {
        background-color: ${getColorCarry('red_40')};
        color: #fff;
        z-index: 2;
        left: 60px;
      }
    }
  }
`
