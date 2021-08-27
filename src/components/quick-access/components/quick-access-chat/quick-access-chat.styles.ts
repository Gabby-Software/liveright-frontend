import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default styled(Link)`
  border: 1px solid ${(p) => p.theme.vars.colors.link};
  color: ${(p) => p.theme.vars.colors.link};
  ${(p) => p.theme.extend.flexCenter}
  border-radius: 10px;
  font-size: 16px;
  padding: 12px;
  svg {
    display: block;
    margin-right: 8px;
  }
`
