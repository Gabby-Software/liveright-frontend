import styled from 'styled-components'

import { mediaQueries } from '../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2rem 0;

  @media ${mediaQueries.TABLET} {
    padding-bottom: 0;
  }

  .PlansTable {
    &__card {
      margin-bottom: 4rem;
      @media ${mediaQueries.TABLET} {
        padding: 0;
        background-color: transparent;
      }
    }

    &__back {
      padding: 0;
      margin-bottom: 1.5rem;
    }

    &__title {
      &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
      }
    }

    &__filters {
      display: flex;
      margin-bottom: 1.5rem;

      @media ${mediaQueries.TABLET} {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.25rem;
      }
    }

    &__select {
      width: 200px;
      margin-right: 1.25rem;

      @media ${mediaQueries.TABLET} {
        width: 100%;
        margin-right: 0;
      }
    }

    &__table {
      &-link {
        color: ${getColorCarry('link')};
      }
      &-status {
        max-width: 130px;
      }
    }
  }
`
