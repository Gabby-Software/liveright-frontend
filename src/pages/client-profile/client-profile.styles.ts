import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  padding-bottom: 2rem;

  .profile {
    &__main {
      padding-top: 26px;
    }
    &__card-dark {
      background-color: ${getColorCarry('primaryDark_v2')};
      width: 100%;
      max-width: 300px;
      margin-right: 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &-wrapper {
        display: block;
      }

      &-title {
        font-size: 1rem;
        font-weight: 500;
        color: #fff;
        margin-bottom: 0.625rem;
        display: flex;
        align-items: center;

        & svg {
          margin-right: 0.5rem;
        }
      }

      &-sub {
        font-size: 0.875rem;
        font-weight: 400;
        color: #fff;
        margin-bottom: 0.625rem;
      }

      &-btn {
        width: fit-content;
        padding: 0;
        color: ${getColorCarry('link')};
        font-weight: 500;

        & svg {
          margin-left: 0.5rem;
        }
      }
    }

    &__grid {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-column-gap: 1rem;
      grid-row-gap: 1.5rem;

      &-user-names-mobile {
        display: none;
      }

      &-item {
        &-name,
        &-value {
          font-weight: 400;
          font-size: 0.875rem;
          color: ${getColorCarry('secondary2_v2')};
          line-height: 1.25rem;
          margin-bottom: 0.25rem;
        }
        &-value {
          color: ${getColorCarry('primaryDark_v2')};
        }
      }

      &__dob-mobile {
        display: none;
      }
    }
  }

  .dark-cards {
    display: flex;
  }

  @media ${mediaQueries.MOBILE} {
    .profile {
      padding-bottom: 0;
      &__grid {
        grid-template-columns: 1fr;

        &-user-names-desktop {
          display: none;
        }

        &-user-names-mobile {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }

      &__dob-desktop {
        display: none;
      }

      &__dob-mobile {
        display: block;
      }

      &__card-dark {
        max-width: 100%;
        &-sub {
          color: ${getColorCarry('neutral_50')};
          font-weight: normal;
          padding: 0.5rem 1rem;
          margin-bottom: 0;
        }
        &-btn {
          padding: 0.5rem 1rem;
          font-size: 14px;
          line-height: 20px;
          color: ${getColorCarry('blue_50')};
          font-weight: normal;
        }
      }
    }

    .dark-cards {
      flex-direction: column-reverse;
    }
  }
`
