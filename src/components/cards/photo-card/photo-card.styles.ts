import styled from 'styled-components'

import { getColorCarry } from '../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  width: 100%;
  max-width: 250px;
  background-color: ${getColorCarry('neutral_10')};
  border-radius: 10px;
  overflow: hidden;

  .photo-card {
    &__img {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }

    &__info {
      padding: 1.25rem 0.5rem;
      text-align: center;
    }

    &__text {
      font-size: 1.125rem;
      font-weight: 700;
      color: ${getColorCarry('secondary4_v2')};
      text-align: center;
    }
  }
`
