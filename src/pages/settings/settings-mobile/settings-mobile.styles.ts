import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Link = styled(RouterLink)`
  color: ${getColorCarry('neutral_100')};
  font-weight: normal;
  font-size: 16px;
`

export default styled.div`
  @media ${mediaQueries.MOBILE} {
    padding-top: 1.25rem;
  }

  & .nav-cards {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1.875rem;
  }
`
