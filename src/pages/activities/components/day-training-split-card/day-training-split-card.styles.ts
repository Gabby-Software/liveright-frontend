import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div``

export const ListItemStyles = styled.div<any>`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.875rem;

  &:last-child {
    margin-bottom: 0;
  }

  .DayTrainingSplitCard__li {
    &-icon {
      width: 28px;
      height: 28px;
      min-width: 28px;
      min-height: 28px;
      border-radius: 9999px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.75rem;
      background-color: ${(props) => props.$color};

      & svg {
        width: 20px;
        height: 20px;
        color: #fff;
      }
    }

    &-title {
      font-size: 1rem;
      font-weight: 500;
      color: ${getColorCarry('neutral_100')};
    }

    &-subtitle {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_70')};
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-content {
      flex: 1;
    }

    &-btn {
      color: ${getColorCarry('neutral_70')};
    }
  }
`
