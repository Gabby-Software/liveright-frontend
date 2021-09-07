import { components } from 'react-select'
import styled from 'styled-components'

import { CaretDownIcon } from '../../../assets/media/icons'
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
      color: ${getColorCarry('primaryDark_v2')};
      box-shadow: none;
      transition: all 0.3s;

      &--menu-is-open {
        border-color: ${getColorCarry('link')};
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }

      &:hover {
        border-color: ${getColorCarry('link')};
      }
    }

    &__value-container {
      padding: 0 1rem;
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
    }

    &__placeholder {
      color: ${getColorCarry('secondary2_v2')};
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
