import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  width: 100%;

  .measurements {
    &__table {
      width: 100%;

      &-container {
        width: auto;
        margin: -1.5rem -1.75rem 0 -1.75rem;
      }

      &-card {
        overflow: hidden;
      }
    }

    &__content {
      margin-bottom: 1.875rem;
    }

    &__photo-filters {
      display: flex;
      align-items: center;
      margin: 1.25rem 0;

      &-field {
        margin-right: 1.25rem;
        width: 100%;
        max-width: 250px;
      }

      @media ${mediaQueries.TABLET} {
      }
    }

    &__photo-card {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &__photo-divider {
      margin: 0 3rem;
      font-size: 3rem;
      font-weight: 700;
      color: ${getColorCarry('primary_v2')};
    }

    &__tabs {
    }
  }
`
