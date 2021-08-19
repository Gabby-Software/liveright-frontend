import styled from 'styled-components'

export default styled.div`
  position: relative;
  color: ${(p) => p.theme.vars.colors.dark_v2};
  svg {
    display: block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: filter 0.3s ease;
    filter: drop-shadow(0 0 0 ${(p) => p.theme.vars.colors.secondary2_v2});
    will-change: filter;
    &:hover {
      transition: filter 0.5s ease;
      filter: drop-shadow(0 0 2px ${(p) => p.theme.vars.colors.secondary2_v2});
    }
  }
`
