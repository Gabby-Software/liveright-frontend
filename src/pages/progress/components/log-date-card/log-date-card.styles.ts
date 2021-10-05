import styled from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'

export const Styles = styled(Card)`
  padding: 1.25rem 1.875rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.875rem;
  margin-bottom: 1.875rem;

  @media ${mediaQueries.TABLET} {
    grid-template-columns: 1fr;
  }
`
