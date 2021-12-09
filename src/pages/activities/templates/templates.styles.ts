import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 30px;
  .Templates {
    &__title {
      &-container {
        margin-bottom: 8px;
      }
    }

    &__note {
      font-size: 0.875rem;
      font-weight: 400;
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};
      margin: 1.875rem 0;
    }

    &__tabs {
      & .ant-tabs-nav {
        background-color: #f5f5f5;
      }
    }
  }
`
