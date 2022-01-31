import styled from 'styled-components'

export default styled.div<{ color?: string }>`
  color: ${({ color }) =>
    color ? color : (p) => p.theme.vars.colors.secondary2_v2};
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: ${(p) => p.theme.vars.defaults.transition};
  &:hover {
    color: ${(p) => p.theme.vars.colors.dark_v2};
  }
  svg {
    height: 10px;
    margin-right: 10px;
  }
`
