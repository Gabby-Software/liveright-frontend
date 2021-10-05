import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  padding-top: 1.875rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.875rem;

  @media ${mediaQueries.TABLET} {
    grid-template-columns: 1fr;
  }

  .photo-form {
    &__label {
      margin-bottom: 1.25rem;
    }

    &__drop {
    }
  }
`

export const DropStyles = styled.div`
  height: 200px;
  border: 1px solid ${getColorCarry('primary_v2')};
  background-color: ${getColorCarry('red_10')};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${getColorCarry('primary_v2')};
  overflow: hidden;

  &:hover {
    border-style: dashed;
    cursor: pointer;
  }

  & svg {
    margin-bottom: 0.5rem;
  }

  .drop {
    &__text {
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('neutral_70')};
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
