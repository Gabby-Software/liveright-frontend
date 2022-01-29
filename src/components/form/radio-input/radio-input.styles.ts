import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.div`
  width: 100%;

  .wrapper {
    width: 100%;
    background-color: ${getColorCarry('secondary3_v2')};
    border: 1px solid ${getColorCarry('neutral_30')};
    padding: 12px 20px 12px 5px;
    border-radius: 10px;
    // width: fit-content;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    transition: all 0.2s ease-out;

    &--checked {
      background-color: ${getColorCarry('red_10')};
      border: 1px solid #fdb6b7;
    }
  }

  .label {
    color: ${getColorCarry('neutral_60')};
    transition: all 0.1s ease-out;
    &--checked {
      color: ${getColorCarry('primary_v2')};
    }
  }

  // Hide default radio button
  .input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  // Custom radio button
  .control {
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #9e9e9e;
    flex-basis: 18px;
    flex-grow: 0;
    flex-shrink: 0;
    cursor: pointer;
    transition: all 0.1s ease-out;
    &--checked {
      border: 5px solid ${getColorCarry('primary_v2')};
    }
  }

  // @media (max-width: $breakpoint-md)
  //   .wrapper
  //     width: 100%
`
