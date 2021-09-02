import styled from 'styled-components'

import { getColorCarry } from '../../../../../../pipes/theme-color.pipe'

export default styled.div`
  width: auto;
  margin: 0 -1.75rem -1.5rem -1.75rem;

  .invoice-table {
    &__table {
      border-radius: 0;
    }
    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    &__link {
      display: block;
    }
    &__action {
      display: block;
      color: #afafaf;
      margin-left: 28px;
      flex-shrink: 0;
      cursor: pointer;
      transition: ${(p) => p.theme.vars.defaults.transition};
      &:first-child {
        margin-left: auto;
      }
      &:hover {
        color: ${(p) => p.theme.vars.colors.secondary3};
      }
    }
    &__pagination {
      padding: 1rem 1.875rem 1.875rem 1.875rem;
    }
    &__status {
      width: 130px;
    }
    &__icon-btn {
      color: ${getColorCarry('dark_v2')};

      &_red {
        color: ${getColorCarry('primary_v2')};
      }
    }

    &__send-btn {
      border-color: ${getColorCarry('primary_v2')};
      color: ${getColorCarry('primary_v2')};
    }
  }
`
