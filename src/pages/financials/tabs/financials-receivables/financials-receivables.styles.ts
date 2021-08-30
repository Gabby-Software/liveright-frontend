import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'
import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  position: relative;
  padding-bottom: 6.875rem;

  .f-receivables {
    &__subtitle-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }
    &__link {
      position: absolute;
      top: 0;
      right: 0;
      ${media('tablet', 'max')`
            display: block;
            position: static;
            margin-bottom: 24px;
        `}
    }
    &__subtitle {
      font-size: 1.375rem;
      font-weight: 700;
      color: ${getColorCarry('primaryDark_v2')};
    }
    &__range-select {
      width: 200px;
    }
    &__divider {
      margin: 2.875rem 0 2.25rem 0;
    }
    &__table-card {
      overflow: hidden;
    }
  }
`
