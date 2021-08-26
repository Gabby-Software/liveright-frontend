import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & .ant-input {
    border-radius: 0.625rem;
    font-size: 0.875rem;
    color: ${getColorCarry('primaryDark_v2')};
    padding: 0.625rem 1rem;
    resize: none;

    &:hover,
    &:focus,
    &:focus-within {
      border-color: ${getColorCarry('link')};
    }
  }
`
