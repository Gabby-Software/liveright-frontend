import styled from 'styled-components'

export default styled.table`
  width: 100%;
  .data-table {
    &__error {
      font-weight: 500;
      padding: 16px 30px;
    }
    &__head {
      background-color: ${(p) => p.theme.vars.colors.primary};
      color: #fff;
      border: 1px solid #dfdfe1;
    }
    &__th {
      text-align: left;
      padding: 16px 30px;
      ${(p) => p.theme.extend.p2};
    }
    &__tr {
      border: 1px solid #f0eef0;
      transition: ${(p) => p.theme.vars.defaults.transition};
      background-color: white;
      &__clickable {
        cursor: pointer;
      }
      &:hover,
      &__active {
        background-color: ${(p) => p.theme.vars.colors.card};
      }
    }
    &__td {
      padding: 16px 30px;
      color: ${(p) => p.theme.vars.colors.secondary3};
      ${(p) => p.theme.extend.p2}
    }
  }
`
