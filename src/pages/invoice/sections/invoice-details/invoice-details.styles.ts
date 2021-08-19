import styled from 'styled-components'

export default styled.div`
  margin: 80px 0;
  display: flex;
  justify-content: space-between;
  max-width: 763px;
  font-size: 16px;
  color: ${(p) => p.theme.vars.colors.primaryDark};
  @media only print {
    font-size: 80%;
    margin: 60px 0;
  }
  .invoice-details {
    &__item {
      display: flex;
    }
    &__label {
      font-weight: 600;
      margin-right: 11px;
    }
    &__value {
      &__error {
        color: ${(p) => p.theme.vars.colors.primary};
      }
    }
  }
`
