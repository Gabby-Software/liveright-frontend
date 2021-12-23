import styled from 'styled-components'

import { mediaQueries } from '../../enums/screen-sizes.enum'
import { getColorCarry } from '../../pipes/theme-color.pipe'

export const ClientsStyles = styled.aside`
  .sidebar {
    &__item {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
      border-radius: 10px;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
      color: ${getColorCarry('primaryDark_v2')};
      padding: 0 0.75rem;
      transition: none;
      position: relative;

      &__uparrow {
        transform: rotate(180deg);
      }

      &__name {
        display: flex;
        align-items: center;
      }

      & svg {
        width: 22px;
        height: 22px;
        margin-right: 0.5rem;
      }

      &_active {
        background-color: ${getColorCarry('primary_v2')};
        color: #fff;
      }

      &:hover {
        background-color: ${getColorCarry('primary_v2')};
        color: #fff;
      }
    }
  }
`

export const TrainerStyles = styled.div`
  .sidebar {
    &__item {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
      padding: 0 0.75rem;
      transition: ${(p) => p.theme.vars.defaults.transition};
      position: relative;

      &__uparrow {
        transform: rotate(180deg);
      }

      &__name {
        display: flex;
        align-items: center;
      }

      &-icon__wrapper {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.5rem;

        svg {
          width: 22px;
          height: 22px;
          fill: rgba(255, 255, 255, 0.7);
        }
      }

      &_active {
        font-weight: 700;
        color: #fff;
        .sidebar__item-icon__wrapper {
          background: #3fc9ad;
          border-radius: 10px;
        }
        & svg {
          fill: #fff;
        }
      }

      &:hover {
        .sidebar__item-icon__wrapper {
          background: #3fc9ad;
          border-radius: 10px;
        }
        font-weight: 700;
        color: #fff;
        .sidebar__item-icon__wrapper {
          svg {
            fill: #fff;
          }
        }
      }

      @media ${mediaQueries.MOBILE} {
        color: ${getColorCarry('neutral_70')};
        border-bottom: 1px solid ${(p) => p.theme.vars.colors.light2};
        padding: 17px 15px;

        &:hover {
          .sidebar__item-icon__wrapper {
            background: #3fc9ad;
            border-radius: 10px;
          }
          font-weight: 700;
          color: #fff;
          .sidebar__item-icon__wrapper {
            svg {
              fill: #fff;
            }
          }
        }
      }
    }
  }

  .submenu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: transparent;
    width: 70%;
    margin-left: auto;

    @media ${mediaQueries.MOBILE} {
      width: 90%;
    }

    &__item {
      margin-bottom: 0.5rem;
      color: rgba(255, 255, 255, 0.7);

      &:hover {
        font-weight: 700;
        color: #fff;
      }

      &_active {
        font-weight: 700;
        color: #fff;
      }

      @media ${mediaQueries.MOBILE} {
        margin-bottom: 0.75rem;
        color: ${getColorCarry('neutral_70')};
        &:hover {
        }
        &_active {
        }
      }
    }
  }
`

export const MobileStyles = styled.div`
  .sidebar {
    &__item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      line-height: 20px;
      color: ${getColorCarry('neutral_70')};
      border-bottom: 1px solid ${(p) => p.theme.vars.colors.light2};
      padding: 17px 15px;
      transition: ${(p) => p.theme.vars.defaults.transition};
      position: relative;

      &__uparrow {
        transform: rotate(180deg);
      }

      &__name {
        display: flex;
        align-items: center;
      }

      &-icon__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          display: block;
          margin-right: 20px;
          height: 22px;
          width: auto;
          fill: ${getColorCarry('neutral_70')};
        }
      }

      &_active {
        font-weight: 700;
      }
    }
  }

  .submenu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: transparent;
    width: 90%;
    margin-left: auto;
    margin-top: 1rem;

    &__item {
      margin-bottom: 0.75rem;
      color: ${getColorCarry('neutral_70')};

      &_active {
        font-weight: 700;
      }
    }
  }
`
