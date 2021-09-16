import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { mediaQueries } from '../../../../../enums/screen-sizes.enum'

export default styled(Link)`
  background-color: #fff;
  width: 100%;
  max-width: 330px;
  padding: 1.5rem 1.375rem;
  border-radius: 0 0 8px 8px;
  display: flex;
  margin-top: 0.25rem;

  .cm-invoice {
    &__left {
      flex: 1;
    }
    &__id {
      color: ${(p) => p.theme.vars.colors.primaryDark2_v2};
      font-size: 18px;
      font-weight: 700;
    }
    &__name {
      color: ${(p) => p.theme.vars.colors.secondary4_v2};
    }
    &__total {
      color: ${(p) => p.theme.vars.colors.green_90};
      margin-top: 20px;
    }
    &__amount {
      font-size: 32px;
      font-weight: bold;
      line-height: 32px;
    }
    &__currency {
      font-size: 18px;
    }

    &__badge {
      width: 130px;
    }

    &__right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
    }

    &__cta {
      width: 130px;
    }
  }

  @media ${mediaQueries.MOBILE} {
    flex-direction: column;

    .cm-invoice {
      &__left {
        margin-bottom: 1rem;
        align-items: center;
        display: flex;
        flex-direction: column;
      }

      &__right {
        align-items: center;
      }

      &__badge {
        margin-bottom: 1rem;
      }
  }
`
