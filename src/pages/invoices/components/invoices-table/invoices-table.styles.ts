import styled from 'styled-components'

import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div`
  width: auto;
  margin: 0 -1.75rem -1.5rem -1.75rem;

  .invoice-table {
    &__table {
      border-radius: 0;
    }

    &__status {
      width: 130px;
    }

    &__actions {
      display: flex;
      justify-content: flex-end;
    }

    &__action {
      color: ${getColorCarry('dark_v2')};
    }

    &__pagination {
      padding: 1rem 1.875rem 1.875rem 1.875rem;
    }
  }
`
