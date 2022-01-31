import styled from 'styled-components'

import { media } from '../../../../assets/styles/_media'
// import { getColorCarry } from '../../../../pipes/theme-color.pipe'

export default styled.div<{ open: boolean; fullscreen?: boolean }>`
  border-radius: 10px;
  background-color: white;
  position: absolute ${({ fullscreen }) => (fullscreen ? '!important' : '')};
  bottom: 0;
  right: 0;
  width: 385px;
  max-height: ${({ fullscreen }) => (fullscreen ? 'none' : '100vh')};
  transform-origin: bottom right;
  transition: ${(p) => p.theme.vars.defaults.transition};
  box-shadow: ${({ open }) =>
    open
      ? '0px 4px 29px rgba(213, 222, 232, 0.55)'
      : '0px 0px 0px rgba(213, 222, 232, 0.55)'};
  transform: ${({ open }) => (open ? 'scale(1)' : 'scale(0)')};
  padding: 25px 22px;
  ${media('tablet', 'max')`
        position: static;
        width: 100%;
        box-shadow: none;
        padding-top: 25px;
  `}
  top: ${({ fullscreen }) => (fullscreen ? 'calc(0px - 91.5vh)' : '')};
`
export const Times = styled.span<{ color?: string }>`
  position: absolute;
  top: 22px;
  right: 22px;
  cursor: pointer;
  z-index: 5;
  color: ${({ color }) =>
    color ? color : (p) => p.theme.vars.colors.secondary2_v2};
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
