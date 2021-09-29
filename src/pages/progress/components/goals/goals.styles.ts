import styled from 'styled-components'

import { mediaQueries } from '../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export const Styles = styled.div`
  width: 100%;

  .goals {
    &__alert {
      margin-bottom: 1.875rem;
    }

    &__title {
      font-size: 1.375rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};

      &-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.875rem;
      }
    }

    &__cards {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1.875rem;
    }
  }

  @media ${mediaQueries.MOBILE} {
    .goals {
      &__title {
        font-size: 1.125rem;
        margin-bottom: 1.25rem;
        
        &-container {
          flex-direction: column;
          align-items: flex-start;
        }
      }      
      
      &__button {
        width: 100%;
      }
      
      &__cards {
        grid-template-columns: 1fr;    
      }
    }
`
