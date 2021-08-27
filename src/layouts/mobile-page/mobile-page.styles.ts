import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  background-color: ${getColorCarry('background_v2')};
  min-height: 100vh;

  .mobile-page {
    &__content {
      padding: 0 1.25rem 7.5rem 1.25rem;
    }
  }
`
