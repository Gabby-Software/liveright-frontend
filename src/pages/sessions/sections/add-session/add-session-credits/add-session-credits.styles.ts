import styled from 'styled-components'

import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid ${getColorCarry('inputBorder_v2')};
  border-top: 1px solid ${getColorCarry('inputBorder_v2')};
  margin-bottom: 1rem;

  & .add-session__credits-left-text {
    font-size: 1rem;
    color: ${getColorCarry('secondary2_v2')};
  }

  & .add-session__credits-left {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  & .add-session__credits-left-value {
    font-size: 1.375rem;
    font-weight: 700;
    color: ${getColorCarry('primaryDark_v2')};
  }
`
