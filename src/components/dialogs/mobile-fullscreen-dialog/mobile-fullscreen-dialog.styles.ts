import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

function getBgColor(props: any) {
  switch (props.$color) {
    case 'secondary':
      return '#fff'
    default:
      return getColorCarry('background_v2')
  }
}

export default styled.div<any>`
  background-color: ${getBgColor};
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  height: 100vh;
  overflow: auto;

  .mobileFullscreenModal {
    &__content {
      padding: 0 1.25rem 7.5rem 1.25rem;
    }
  }
`
