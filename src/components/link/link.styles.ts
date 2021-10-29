import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default styled(Link)`
  color: ${(p) => p.theme.vars.colors.primary_v2};
  transition: ${(p) => p.theme.vars.defaults.transition};
  font-weight: 600;
  &:hover {
    color: ${(p) => p.theme.vars.colors.primaryLight};
  }
`
