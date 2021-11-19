import styled from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: grid;
  grid-template-columns: 46px 2fr 1fr 1fr 1fr 1fr 3fr 46px;
  gap: 1rem;
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }

  .Exercise {
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
      align-items: flex-end;

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
  }
`
