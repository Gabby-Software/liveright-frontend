import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'

export const Styles = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${mediaQueries.TABLET} {
    flex-direction: column;
    width: 100%;
  }

  .filters {
    &__filters {
      display: flex;
      align-items: center;
    }

    &__title-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 1.25rem;
    }

    &__toggle-btn {
      padding: 0;
      height: fit-content;
      font-weight: 400;
      text-decoration: underline;

      &:hover {
        text-decoration: underline;
      }

      @media ${mediaQueries.TABLET} {
        font-size: 0.875rem;
      }
    }

    &__form-item {
      margin-left: 1.25rem;

      @media ${mediaQueries.TABLET} {
        width: 100%;
        margin-left: 0;
      }

      &_date {
        width: 200px;

        @media ${mediaQueries.TABLET} {
          width: 100%;
        }
      }

      &_select {
        width: 250px;

        @media ${mediaQueries.TABLET} {
          width: 100%;
        }
      }
    }
  }
`
