import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  background-color: ${getColorCarry('background_v2')};

  .mobile-page {
    &__content {
      padding: 0 1.25rem 9rem 1.25rem;
    }
  }
`
