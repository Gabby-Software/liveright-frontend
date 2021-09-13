import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export const Styles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 0 1.875rem 0;

  @media only print {
    display: none;
  }

  .mobile-back {
    &__link {
      display: flex;
      align-items: center;
      color: ${getColorCarry('link')};
      font-size: 0.875rem;
      font-weight: 500;

      & svg {
        margin-right: 0.5rem;
      }
    }
  }
`
