import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  .qa-topbar {
    position: absolute;
    width: 100%;
    height: 134px;
    background-color: ${getColorCarry('neutral_100')};
    top: 0;
    left: 0;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    z-index: -1;
  }
`
