import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ArrowLink = styled(Link)`
  position: absolute;
  top: 30px;
  left: 22px;
  width: 14px;
  color: black;
  @media all and (min-width: ${(p) => p.theme.vars.media.tablet}px) {
    display: none;
  }
`

export const TextLink = styled.div`
  margin-top: 40px;
  font-size: 18px;
  color: ${(p) => p.theme.vars.colors.primaryDark};
  &:hover {
    color: ${(p) => p.theme.vars.colors.primaryDark};
  }
  .primary {
    color: ${(p) => p.theme.vars.colors.primary_v2};
    &:hover {
      color: ${(p) => p.theme.vars.colors.primary_v2};
    }
    font-weight: 600;
  }
`
