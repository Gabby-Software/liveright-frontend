import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.div`
  padding-bottom: 5rem;

  .invoices {
    &__subtitle {
      font-size: 1.375rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark2_v2')};
      margin-bottom: 1.25rem;
    }

    &__body {
      max-width: 1300px;
    }
  }
`
