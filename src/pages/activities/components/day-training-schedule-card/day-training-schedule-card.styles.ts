import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  .DayTrainingScheduleCard {
    &__row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_100')};
      border-radius: 10px;
      margin-bottom: 0.625rem;

      &:last-child {
        margin-bottom: 0;
      }

      &[data-type='workout'] {
        background-color: rgba(228, 154, 10, 0.05);
      }
      &[data-type='meal'] {
        background-color: rgba(63, 201, 173, 0.05);
      }
      &[data-type='exercise'] {
        background-color: rgba(239, 23, 51, 0.05);
      }

      &-content {
        display: flex;
        align-items: center;
      }

      &-time {
        margin-right: 1.75rem;
      }
    }
  }
`
