import styled from 'styled-components'

export default styled.div<{ open: boolean }>`
  border-radius: 10px;
  background-color: white;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 376px;
  transform-origin: bottom right;
  transition: ${(p) => p.theme.vars.defaults.transition};
  box-shadow: ${({ open }) =>
    open
      ? '0px 4px 29px rgba(213, 222, 232, 0.55)'
      : '0px 0px 0px rgba(213, 222, 232, 0.55)'};
  transform: ${({ open }) => (open ? 'scale(1)' : 'scale(0)')};
  padding: 30px 22px;
`
export const Times = styled.span`
  position: absolute;
  top: 22px;
  right: 22px;
  cursor: pointer;
  z-index: 5;
  color: ${(p) => p.theme.vars.colors.secondary2_v2};
  transition: ${(p) => p.theme.vars.defaults.transition};
  transform-origin: center center;
  svg {
    height: 24px;
    width: 24px;
    display: block;
  }
  &:hover {
    transform: rotate(90deg);
    color: ${(p) => p.theme.vars.colors.dark_v2};
  }
`
