import styled from 'styled-components'

export default styled.a`
  display: block;
  background-color: white;
  border-color: 1px solid #ededed;
  color: #404040;
  padding: 16px 21px;
  border-radius: 0 0 8px 8px;
  margin-top: 4px;
  transition: ${(p) => p.theme.vars.defaults.transition};
  &:hover {
    color: ${(p) => p.theme.vars.colors.link};
  }
`
