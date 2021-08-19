import styled from 'styled-components'

export default styled.div`
  [class$='wrapper'] {
    margin-bottom: 24px;
  }
  div {
    margin-top: 0;
  }
  .add-invoice {
    &__action {
      color: ${(p) => p.theme.vars.colors.primary};
      font-weight: 500;
      margin: 0 0 24px 0;
    }
    &__preview {
      margin-bottom: 40px;
    }
    &__label {
      font-weight: 600;
      font-size: 14px;
      padding: 12px 0 0px 0;
      display: block;
    }
    &__value {
      font-weight: 500;
      font-size: 14px;
      text-align: right;
      display: block;
      padding: 12px 0 0 0;
    }
    &__total {
      font-weight: 700;
      font-size: 14px;
      padding: 12px 0 0 0;
      display: block;
    }
  }
`
