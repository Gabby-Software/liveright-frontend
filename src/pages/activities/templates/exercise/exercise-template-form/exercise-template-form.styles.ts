import styled, { css } from 'styled-components'

import Card from '../../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../../enums/screen-sizes.enum'
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

export const ExerciseStyles = styled(Card)`
  background-color: ${getColorCarry('white')};
  padding: 1.5rem;

  .Exercise {
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

    &__schedule {
      &-container {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr;
        gap: 1.25rem;
        align-items: flex-end;
        margin-bottom: 1rem;
      }
    }

    &__exercises {
      margin: 1.5rem 0;
    }

    &__template {
      margin-top: 1rem;
      margin-left: 16px;
      display: flex;
      align-items: center;

      & > :first-child {
        margin-right: 8px;
      }

      & label {
        margin: 0;
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      padding-top: 1.25rem;
      border-top: 1px solid ${getColorCarry('inputBorder_v2')};

      @media ${mediaQueries.MOBILE} {
        flex-wrap: wrap;
      }
    }

    &__action-btn {
      & svg {
        margin-right: 0.5rem;
      }

      &-red {
        color: ${getColorCarry('red')};
      }
    }
  }
`

export const ExerciseFormStyles = styled.div<any>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.cardio ? '4fr 4fr 4fr' : '4fr 2fr 2fr 2fr 2fr 4fr'};
  gap: 1rem;
  padding: 0.75rem 0 0.75rem 0;
  background-color: ${getColorCarry('neutral_10')};
  border-radius: 15px;
  position: relative;
  margin: 10px 0;

  & label {
    white-space: nowrap;
  }

  ${(props) =>
    props.$isDragging &&
    css`
      border: 1px dashed ${getColorCarry('orange_60')};
    `};

  ${(props) =>
    props.$prefix &&
    css`
      margin-top: 1rem;
    `};

  .Exercise {
    &__prefix {
      margin-top: 0;
      position: absolute;
      top: -1.5rem;
    }

    &__delete {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;

      &-btn {
        color: ${getColorCarry('red')};
      }
    }

    &__drag {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &-btn {
        height: 44px;
        width: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: transparent;
        border: 0;
        color: ${getColorCarry('secondary2_v2')};
      }
    }

    &__checkbox {
      margin: 0 0.75rem;

      &-container {
        display: flex;
        align-items: center;
        margin-left: 4rem;
      }
    }
  }

  .exercise-input {
    display: flex;
    align-items: center;

    &__prefix {
      width: 40px;
      margin-top: 25px;
    }
  }
`
