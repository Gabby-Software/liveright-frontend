import styled from 'styled-components'

export default styled.div`
  counter-increment: create-section;
  padding: 24px 0;
  border-top: 1px solid ${(p) => p.theme.vars.colors.light};
  border-bottom: 1px solid ${(p) => p.theme.vars.colors.light};
  margin-bottom: 24px;
  font-weight: 500;
  cursor: pointer;
  .ci-preview__client {
    &__label {
      color: ${(p) => p.theme.vars.colors.secondary3};
    }
    &__value {
      color: ${(p) => p.theme.vars.colors.primaryDark};
      font-weight: 600;
      padding-left: 10px;
    }
  }
`
