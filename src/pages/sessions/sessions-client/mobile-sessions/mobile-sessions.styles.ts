import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  .sessions {
    &__options {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-top: 1.25rem;
    }

    &__cards-title-container {
      display: flex;
      align-items: center;
    }

    &__cards-title {
      font-size: 1.125rem;
      font-weight: 700;
      margin: 1.5rem 1.5rem 1.5rem 0;
      flex: 1;
    }

    &__cards-title-btn-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 52px;
      height: 52px;
      background-color: #fff;
      border-radius: 8px;
    }

    &__cards-title-calendar-btn {
      color: ${getColorCarry('link')};

      &:hover,
      &:focus {
        color: ${getColorCarry('link')};
      }
    }

    &__doc-btn {
      color: ${getColorCarry('orange_60')};

      &:hover,
      &:active {
        color: ${getColorCarry('orange_60')};
      }
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
    }
    
    &__upcoming-container {
      padding-bottom: 3.25rem;
    }
  }
`

export const HeaderComponent = styled.div`
  width: 100%;
  padding-top: 1.25rem;

  & .sessions__credits-btn {
    width: 100%;
  }
`
