import styled from 'styled-components'

import { mediaQueries } from '../../../../../../enums/screen-sizes.enum'
import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export default styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
  margin: 1.875rem 0;

  @media ${mediaQueries.MOBILE} {
    grid-template-columns: 1fr;
  }

  .info_cards {
    &__payouts {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &__link {
        margin: 8px 0;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 20px;
        color: ${getColorCarry('link')};
      }
    }
  }
`
