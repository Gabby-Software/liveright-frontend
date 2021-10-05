import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'

const EditGoalsHead = styled.h1`
  font-weight: 700;
  font-size: 32px;
  line-height: 1.187;

  @media ${mediaQueries.MOBILE} {
    display: none;
  }
`

export { EditGoalsHead }
