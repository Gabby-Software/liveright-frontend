import styled from 'styled-components'

import { media } from '../../assets/styles/_media'

export default styled.div`
  display: flex;
  border-radius: 10px 0 0 0;
  height: calc(100vh - 119px);

  ${media('tablet', 'max')`
    height: 100vh;
  `}
`
