import styled from 'styled-components'

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

export const WorkoutStyles = styled(Card)`
  background-color: ${getColorCarry('white')};
  padding: 1.5rem;

  .Workout {
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

export const WorkoutSubtitle = styled.p`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  color: ${getColorCarry('primaryDark_v2')};
  margin: 1.25rem 0;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${getColorCarry('inputBorder_v2')};
    margin-left: 1.25rem;
  }

  @media ${mediaQueries.TABLET} {
    font-weight: 500;
    margin-bottom: 0;
  }
`
