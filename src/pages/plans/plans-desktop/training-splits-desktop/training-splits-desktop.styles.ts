import styled from 'styled-components'

export default styled.div`
  .split {
    &__status {
      ${(p) => p.theme.extend.small}
      color:white;
      padding: 4px 8px;
      border-radius: 4px;
      &__active {
        background-color: ${(p) => p.theme.vars.colors.error};
      }
      &__inactive {
        background-color: ${(p) => p.theme.vars.colors.success};
      }
      &__pending {
        background-color: ${(p) => p.theme.vars.colors.warning};
      }
    }
  }
`
