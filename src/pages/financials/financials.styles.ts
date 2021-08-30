import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  .financials {
    &__title-container {
      padding-top: 2.5rem;
      display: flex;
      justify-content: space-between;
    }

    &__title {
      font-size: 2rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
    }

    &__tabs {
      margin: 2.75rem 0 1.5rem 0;
    }
  }
`
