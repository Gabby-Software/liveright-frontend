import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

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

  .mobile-page {
    &__content {
      padding: 0 1.25rem 7.5rem 1.25rem;
    }
  }
`
