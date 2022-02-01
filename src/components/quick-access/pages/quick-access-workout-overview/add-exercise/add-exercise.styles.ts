import styled from 'styled-components'

import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

// import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div<{ mode: 'exercise' | 'superset' }>`
  .qa-workout-overview-add-exercise {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-bottom: 1rem;

      h2 {
        font-weight: bold;
        font-size: 18px;
        line-height: 26px;
      }

      button {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
      }
    }

    &__superset-heading {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 16px;

      h4 {
        font-size: 16px;
        line-height: 24px;
      }
    }

    &__divider {
      flex-grow: 1;
      border-top: 1px solid ${getColorCarry('neutral_40')};
    }

    &__exercise {
      margin-bottom: 20px;
    }

    &__form-container {
      ${({ mode }) =>
        mode === 'superset'
          ? `background-color: #F1F4F7; border-radius: 10px; padding: 20px 16px;`
          : ''}
    }

    &__input-group {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    &__input-group-item {
      max-width: ${({ mode }) => (mode === 'exercise' ? '158px' : '146px')};
    }

    &__add-superset-exercise-btn {
      padding: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 10px;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      svg {
        margin-bottom: 2px;
      }
    }

    &__button {
      width: 100%;
      margin-top: 30px;
    }
  }
`
