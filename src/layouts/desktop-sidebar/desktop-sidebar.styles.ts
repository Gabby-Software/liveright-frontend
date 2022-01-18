import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export const ClientsStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  overflow-y: auto;
  position: sticky;
  z-index: 40;
  top: 0;
  flex-shrink: 0;
  border-right: 1px solid ${(p) => p.theme.vars.colors.secondary2};
  width: 220px;
  padding: 1.125rem 1.125rem calc(1.125rem + 88px) 1.125rem;
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  @media only print {
    display: none;
  }

  .sidebar {
    &__trainer {
      margin-bottom: 2rem;
    }

    &__logo {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;

      & svg {
        width: 64px;
      }
    }

    &__divider {
      width: 100%;
      height: 1px;
      background-color: ${getColorCarry('inputBorder_v2')};

      &_spacing {
        margin-bottom: 2rem;
      }
    }

    &__nav-spacer {
    }

    &__nav {
      display: flex;
      flex-direction: column;
    }

    &__menu {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
    }

    &__item {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      font-weight: 400;
      border-radius: 10px;
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
      color: ${getColorCarry('primaryDark_v2')};
      padding: 0 0.75rem;
      transition: none;
      position: relative;
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
export const TrainerStyles = styled.aside`
  background: linear-gradient(#196a73, #00363c);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  overflow-y: auto;
  position: sticky;
  z-index: 50;
  top: 0;
  flex-shrink: 0;
  border-right: 1px solid ${(p) => p.theme.vars.colors.secondary2};
  width: 220px;
  padding: 1.125rem 1.125rem calc(1.125rem + 88px) 1.125rem;
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  @media only print {
    display: none;
  }

  .sidebar {
    &__trainer {
      margin-bottom: 2rem;
    }

    &__logo {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;

      & svg {
        width: 118px;
      }
    }

    &__nav-spacer {
    }

    &__nav {
      display: flex;
      flex-direction: column;
    }

    &__menu {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
    }

    &__item {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 0.75rem;
      color: rgba(255, 255, 255, 0.7);
      padding: 0 0.75rem;
      transition: ${(p) => p.theme.vars.defaults.transition};
      position: relative;

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
    }
  }
`
