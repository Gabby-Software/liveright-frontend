import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'

export default styled.div`
  position: relative;
  .f-receivables {
    &__range {
      max-width: 240px;
      margin-top: 80px;
    }
    &__link {
      position: absolute;
      top: 0;
      right: 0;
      ${media('tablet', 'max')`
            display: block;
            position: static;
            margin-bottom: 24px;
        `}
    }
  }
`
