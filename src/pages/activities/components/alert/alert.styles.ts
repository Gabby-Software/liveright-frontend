import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'

export const Styles = styled.div`
  display: flex;
  background-color: rgba(228, 154, 10, 0.05);
  border: 1px solid #e49a0a;
  padding: 1.25rem 1.875rem;
  border-radius: 10px;
  color: #10243d;
  margin-bottom: 1.25rem;

  @media ${mediaQueries.TABLET} {
    flex-direction: column;
  }

  .Alert {
    &__body {
      display: flex;
      font-size: 0.875rem;
      line-height: 1.25rem;
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
        margin-bottom: 0.75rem;
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
