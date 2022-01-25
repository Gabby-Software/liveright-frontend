import styled from 'styled-components'

import Card from '../../../../../components/cards/card/card.component'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div`
  margin: 2rem 0;

  .Title {
    font-size: 1.6rem;
    font-weight: 700;
    color: ${getColorCarry('primaryDark2_v2')};
    margin: 1rem 0;
  }
`

export const WorkoutDayStyles = styled(Card)`
  background-color: ${getColorCarry('white')};
  padding: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  .WorkoutDay {
    &__header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.25rem;

      &-title {
        display: flex;
        align-items: center;

        & .subtitle {
          font-size: 1.175rem;
          font-weight: 700;
          color: ${getColorCarry('neutral_100')};
        }
      }

      &-icon {
        width: 34px;
        height: 34px;
        min-width: 34px;
        min-height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 9999px;
        background-color: ${getColorCarry('orange_60')};
        margin-right: 1rem;
        color: #fff;

        & svg {
          width: 20px;
          height: 20px;
        }
      }

      &-checkbox {
        &-cell {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
        }

        &-container {
          display: flex;
          align-items: center;
        }

        &-label {
          margin: 0 0.75rem;
        }

        &-btn {
          color: ${getColorCarry('red')};
          margin-top: -8px;
        }
      }
    }

    &__checkbox {
      margin: 0 0.75rem;

      &-container {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
      }
    }

    &__title {
      max-width: 512px;
      margin-bottom: 1rem;
    }
  }

  .WorkoutDayTemplateForm {
    &__add-workout {
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      color: ${getColorCarry('link')};
      border: 1px dashed ${getColorCarry('link')};
      border-radius: 10px;
      cursor: pointer;

      & svg {
        margin-right: 0.5rem;
      }
    }
  }
`
