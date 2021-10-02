import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'

export default styled.div`
  @media ${mediaQueries.MOBILE} {
    padding-top: 1.25rem;

    .settings {
      &__tabs {
        position: relative;
        top: -30px;

        & .ant-tabs-tab {
          max-width: 33%;
          white-space: normal;
          text-align: center;
        }
      }
    }
  }
`
