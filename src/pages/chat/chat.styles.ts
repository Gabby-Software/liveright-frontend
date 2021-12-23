import styled from 'styled-components'

import { media } from '../../assets/styles/_media'

export default styled.div`
  display: flex;
  height: calc(100vh - 135px);

  ${media('tablet', 'max')`
    height: 100vh;
  `}
`
