import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'

export const Styles = styled.div`
  padding: 0;

  @media ${mediaQueries.TABLET} {
    padding-bottom: 0;
  }

  .TemplateTable {
    &__filters {
      margin-bottom: 2rem;
      display: flex;
    }

    &__select {
      width: 200px;
      margin-left: 1.25rem;
    }

    &__search {
      width: 320px;
    }

    &__content {
    }
  }
`
