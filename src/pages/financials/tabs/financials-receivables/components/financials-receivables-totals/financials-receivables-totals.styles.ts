import styled from 'styled-components'

import { mediaQueries } from '../../../../../../enums/screen-sizes.enum'

export default styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2.875rem;

  @media ${mediaQueries.MOBILE} {
    grid-template-columns: 1fr 1fr;
  }
`
