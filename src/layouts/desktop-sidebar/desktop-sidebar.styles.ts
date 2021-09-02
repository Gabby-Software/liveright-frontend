import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  position: sticky;
  z-index: 40;
  top: 0;
  flex-shrink: 0;
  border-right: 1px solid ${(p) => p.theme.vars.colors.secondary2};
  width: 210px;
  padding: 1.125rem;
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
`
