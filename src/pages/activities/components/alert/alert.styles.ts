import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(228, 154, 10, 0.05);
  border: 1px solid #e49a0a;
  padding: 1.25rem 1.875rem;
  border-radius: 10px;
  color: #10243d;
  margin-bottom: 1.25rem;

  @media ${mediaQueries.TABLET} {
    padding: 1rem;
  }

  .Alert {
    &__body {
      font-size: 0.875rem;
      line-height: 1.25rem;
      padding-left: 0.25rem;

      & ul {
        padding-inline-start: 16px;
      }
    }

    &__header {
      display: flex;
      margin-bottom: 0.75rem;
    }

    &__title {
      display: flex;
      align-items: center;
      min-height: 100%;
      font-size: 0.875rem;
      font-weight: 700;
    }

    &__icon {
      width: 34px;
      height: 34px;
      min-width: 34px;
      min-height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #e49a0a;
      border-radius: 9999px;
      color: #fff;
      margin-right: 1.25rem;

      @media ${mediaQueries.TABLET} {
        margin-right: 1rem;
      }
    }

    &__action {
      background-color: transparent;
      border: 0;
      text-decoration: underline;
      color: #e49a0a;
      cursor: pointer;
      margin: 0 0.25rem;
    }
  }
`
