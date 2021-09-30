import styled from 'styled-components'

import Button from '../../../components/buttons/button/button.component'
import { mediaQueries } from '../../../enums/screen-sizes.enum'

export const Wrapper = styled.div<any>`
  padding-top: ${(props) => (props.$client ? '1.25rem' : 0)};

  .health {
    &__tabs {
      @media ${mediaQueries.TABLET} {
        margin: 0 0 1.875rem 0;
      }
    }
  }
`

export const HeaderAction = styled(Button)`
  & svg {
    margin-left: 1rem;
  }
`
