import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  margin-bottom: 1.5rem;

  .create-invoice {
    &__section-title {
      counter-increment: create-section;
      font-size: 0.875rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
      margin-bottom: 1.375rem;

      &:before {
        content: counter(create-section) '. ';
      }
    }

    &__content {
      padding: 0 1.125rem;
    }
  }
`
