import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'

export const Styles = styled.div`
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 1.875rem;

  @media ${mediaQueries.TABLET} {
    grid-template-columns: 1fr;
  }
`
