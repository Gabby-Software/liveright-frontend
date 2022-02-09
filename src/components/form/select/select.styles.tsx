import { components } from 'react-select'
import styled from 'styled-components'

import { CaretDownIcon, SearchIcon } from '../../../assets/media/icons'
import { getColorCarry } from '../../../pipes/theme-color.pipe'
import { getHeight } from '../utils.styles'

export const Styles = styled.div<any>`
  width: 100%;
  flex-direction: column;
  display: flex;
  position: relative;

  & .select__prefix {
    position: absolute;
    z-index: 11;
    height: 24px;
  }

  & .select__container {
    display: flex;
    align-items: center;
  }

  .select {
    &-container {
      width: 100%;
      border: 0;
    }

    &__control {
      width: 100%;
      height: ${getHeight};
      background-color: #fff;
      border-radius: 0.625rem;
      border: 1px solid ${getColorCarry('inputBorder_v2')};
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};
      box-shadow: none;
      transition: all 0.3s;

      &--menu-is-open {
        border-color: ${getColorCarry('link')};
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }

      &--is-disabled {
        background-color: #f5f5f5;
        border-color: #d9d9d9;
      }

      &:hover {
        border-color: ${getColorCarry('link')};
      }
    }

    &__value-container {
      padding: 0 1rem;

      &--is-disabled {
        color: rgba(0, 0, 0, 0.25);
      }
    }

    &__indicators {
      padding: 0 0.5rem;
    }

    &__dropdown-indicator {
      padding: 0.5rem;
    }

    &__menu {
      z-index: 22;
      overflow-x: hidden;
      border-radius: 0.625rem;
      padding: 0;
      box-shadow: 0px 4px 29px rgba(213, 222, 232, 0.55);
    }

    &__option {
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
      font-weight: 400;

      &--is-selected {
        background-color: #fff;
        color: ${getColorCarry('primaryDark_v2')};
        background-color: rgba(0, 0, 0, 0.05);
      }

      &--is-focused {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }

    &__placeholder {
      color: ${getColorCarry('secondary2_v2')};
      font-feature-settings: normal;
      font-variant: normal;
    }

    &__group {
      border-bottom: 2px dashed #eee;
      padding-bottom: 2px;
      margin-bottom: 2px;
    }
  }
`

export function DropdownIndicator(props: any) {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  )
}

export function DropdownSearch(props: any) {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIcon />
    </components.DropdownIndicator>
  )
}
