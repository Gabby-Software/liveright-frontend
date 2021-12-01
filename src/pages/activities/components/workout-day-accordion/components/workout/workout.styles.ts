import styled from 'styled-components'

import Card from '../../../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled(Card)`
  background-color: ${getColorCarry('neutral_10')};
  padding: 1.5rem;
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }

  .Workout {
    &__header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.25rem;

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
        }
      }

      &-schedule {
        &-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          align-items: flex-end;
        }
      }
    }

    &__exercises {
      margin-bottom: 1.25rem;
    }

    &__actions {
      display: flex;
      align-items: center;
      padding-top: 1.25rem;
      border-top: 1px solid ${getColorCarry('inputBorder_v2')};
    }

    &__action-btn {
      & svg {
        margin-right: 0.5rem;
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
  margin-bottom: 1.25rem;

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
