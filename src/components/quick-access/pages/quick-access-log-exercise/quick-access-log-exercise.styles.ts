import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  h4 {
    color: ${getColorCarry('neutral_60')};
    font-weight: normal;
  }

  .qa-log-exercise {
    &__search {
      margin: 1.25rem 0;
    }

    &__button {
      margin: 1.25rem auto 0 auto;
      padding: 0 !important;
    }

    &__loading {
      margin-top: 20px;
      text-align: center;
    }
  }
`
