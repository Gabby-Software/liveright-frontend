import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div<{ iconColor: string; completed: boolean }>`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  background-color: ${({ completed }) =>
    completed ? getColorCarry('neutral_30') : getColorCarry('neutral_100')};
  padding: 1.4rem 2rem 1.1rem 1.5rem;
  margin: 0.5rem 0;
  cursor: pointer;

  h3 {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: normal;
    color: ${({ completed }) =>
      completed
        ? getColorCarry('neutral_100')
        : getColorCarry('secondary3_v2')};
  }

  p {
    color ${getColorCarry('neutral_60')};
  }

  .qa-log-item {
    &__icon {
      color: ${({ iconColor }) => iconColor};
      height: 27px;
      width: 27px;
    }

    &__checkIcon {
        flex-grow: 1;
        text-align: right;
        svg {
            color: #3FC9AD;
        }
    }
  }
`
