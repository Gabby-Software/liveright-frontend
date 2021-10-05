import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import Card from '../../../../components/cards/card/card.component'
import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const LinkStyles = styled<any>(Link)`
  display: block;
  width: auto;
  margin-right: 0.875rem;

  &:last-child {
    margin-right: 0;
  }

  ${(props) =>
    !props.$mobCol &&
    css`
      @media ${mediaQueries.TABLET} {
        margin-right: 0;
      }
    `}
`

export const Styles = styled<any>(Card)`
  flex-direction: column;
  min-width: 330px;

  @media ${mediaQueries.TABLET} {
    width: 100%;
    min-width: auto;
  }

  .invoice-card {
    &__row {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: 1.875rem;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }

      @media ${mediaQueries.TABLET} {
        flex-wrap: nowrap;
      }
    }

    &__number {
      font-size: 1.125rem;
      color: ${getColorCarry('primaryDark2_v2')};
      font-weight: 700;
      line-height: 1.25;
      white-space: nowrap;

      @media ${mediaQueries.TABLET} {
        white-space: normal;
      }
    }

    &__issuer {
      color: ${getColorCarry('secondary4_v2')};
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1.25;
      white-space: nowrap;

      @media ${mediaQueries.TABLET} {
        white-space: normal;
      }
    }

    &__price {
      font-size: 2rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      white-space: nowrap;

      & span {
        font-size: 1.125rem;
        font-weight: 400;
      }
    }

    &__btn {
      min-width: 130px;
      margin-left: 1rem;
    }

    &__btn-text {
      min-width: auto;
      padding: 0;
    }

    &__due-title {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('secondary2_v2')};
    }

    &__due-value {
      font-size: 1rem;
      font-weight: 400;
      color: ${getColorCarry('primary_v2')};
    }
  }

  ${(props) =>
    !props.$mobCol &&
    css`
      @media ${mediaQueries.TABLET} {
        margin-right: 0;
        margin-bottom: 1rem;
      }

      .invoice-card {
        @media ${mediaQueries.TABLET} {
          &__price {
            font-size: 1.25rem;
            font-weight: 700;

            & span {
              font-size: 0.75rem;
            }
          }
        }

        &__btn {
          @media ${mediaQueries.TABLET} {
            min-width: auto;
            width: 115px;
          }
        }
      }
    `}

  ${(props) =>
    props.$mobCol &&
    css`
      @media ${mediaQueries.TABLET} {
        min-width: auto;
        width: 175px;
        max-width: 175px;
      }

      .invoice-card {
        &__row {
          @media ${mediaQueries.TABLET} {
            flex-direction: column;
            align-items: center;
            margin-bottom: 1.25rem;
          }
        }

        &__issuer {
          @media ${mediaQueries.TABLET} {
            text-align: center;
          }
        }

        &__btn {
          @media ${mediaQueries.TABLET} {
            margin-bottom: 1rem;
            margin-left: 0;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    `}
`
