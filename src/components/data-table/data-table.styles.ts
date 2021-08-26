import styled from 'styled-components'

import { getColorCarry } from '../../pipes/theme-color.pipe'

export default styled.table`
  width: 100%;

  .data-table {
    &__error {
      font-weight: 500;
      padding: 16px 30px;
    }
    &__head {
      background-color: ${getColorCarry('primary_v2')};
      color: #fff;
    }
    &__th {
      text-align: left;
      font-size: 0.875rem;
      color: #fff;
      font-weight: 500;
      padding: 1.25rem 1rem 1.5rem 1rem;

      &:first-child {
        padding-left: 1.75rem;
      }
      &:last-child {
        padding-right: 1.75rem;
      }

      &-container {
        display: flex;
        align-items: center;
        cursor: pointer;

        & svg {
          margin: 0 0.5rem;
        }
      }
    }
    &__tr {
      transition: ${(p) => p.theme.vars.defaults.transition};
      background-color: white;

      &__clickable {
        cursor: pointer;
      }

      &:nth-child(even) {
        background-color: ${getColorCarry('neutral_10')};
      }
    }
    &__td {
      padding: 1.25rem 1rem 1.25rem 1rem;
      color: ${(p) => p.theme.vars.colors.secondary3};
      font-size: 0.875rem;
      font-weight: 400;
      color: ${getColorCarry('primaryDark_v2')};

      &:first-child {
        padding-left: 1.75rem;
      }
      &:last-child {
        padding-right: 1.75rem;
      }
    }
  }
`
