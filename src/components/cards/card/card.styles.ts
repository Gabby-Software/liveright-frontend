import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  background-color: #fff;
  padding: 1.5rem 1.75rem;

  @media ${mediaQueries.TABLET} {
    padding: 1.5rem 1.25rem;
  }

  .f-overview__graph {
    &__left {
      padding-right: 1.5rem;
    }
  }
`
