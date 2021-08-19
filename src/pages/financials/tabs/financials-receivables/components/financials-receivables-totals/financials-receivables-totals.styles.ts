import styled from 'styled-components'

import { media } from '../../../../../../assets/styles/_media'

export default styled.div`
  display: flex;
  margin: 40px 0 80px 0;
  ${media('tablet', 'max')`
    flex-wrap: wrap;
`}
`
