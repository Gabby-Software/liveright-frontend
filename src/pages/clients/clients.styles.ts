import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding: 2.5rem 0;

  @media ${mediaQueries.MOBILE} {
    padding-bottom: 0;
  }

  .clients {
    &__title {
      &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2.5rem;
      }
    }

    &__filter {
      display: flex;
      align-items: center;

      &-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      &-search {
        width: 320px;
        margin-right: 1.25rem;
      }

      &-status {
        width: 200px;
      }

      &-btn {
        height: 44px;
        background-color: #fff;
      }
    }

    &__table {
      &-container {
        width: auto;
        margin: 0 -1.75rem 0 -1.75rem;
      }

      &-action {
        color: inherit;

        & svg {
          width: 25px;
          height: 25px;
        }

        &[data-type='Workshops'] {
          color: ${getColorCarry('blue_80')};
        }
        &[data-type='Exercises'] {
          color: ${getColorCarry('red_80')};
        }
        &[data-type='Meals'] {
          color: ${getColorCarry('orange_60')};
        }
        &[data-type='Measures'] {
          color: ${getColorCarry('primaryDark_v2')};
        }
      }

      &-actions {
        display: flex;
      }
    }

    &__tabs {
      & .ant-tabs-nav {
        padding: 0;
        margin: 0;
      }

      & .ant-tabs-tab {
        &:nth-child(1) {
          margin-left: 0;
        }
      }
    }

    &__client-card {
      background-color: ${getColorCarry('neutral_10')};
      border: 1px solid ${getColorCarry('background_v2')};
      margin-bottom: 0.75rem;

      &-title {
        font-size: 1rem;
        font-weight: 500;
        color: ${getColorCarry('primaryDark_v2')};
        margin-bottom: 0.75rem;
      }

      &-subtitle {
        font-size: 0.875rem;
        font-weight: 400;
        color: ${getColorCarry('secondary2_v2')};
      }
    }
  }
`

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;

  & .clients__filter-status {
    margin-bottom: 3rem;
  }
`
