import styled from 'styled-components'

export default styled.div`
  padding: 6px 12px;
  font-weight: 300;
  .cm-text {
    &__read-more {
      margin-left: 10px;
      color: ${(p) => p.theme.vars.colors.link};
    }
  }
`
