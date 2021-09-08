import styled from 'styled-components'

export default styled.div`
  position: relative;

  .ci-item {
    &__total {
      font-weight: 600;
      font-size: 14px;
      text-align: right;
      color: ${(p) => p.theme.vars.colors.primaryDark};
      &__value {
        color: ${(p) => p.theme.vars.colors.primary};
        padding-left: 12px;
      }
    }
    &__remove {
      color: ${(p) => p.theme.vars.colors.error};
      position: absolute;
      right: 0;
      padding: 20px 0 20px 20px;
      cursor: pointer;
    }

    &__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.25rem;

      div {
        margin-right: 12px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .add-invoice__form-item {
    margin-bottom: 1.25rem;
  }
`
