import styled from 'styled-components'

import { FormInputLabeledUI } from '../forms/form-input-labeled/form-input-labeled.component'

export default styled.div<{ elevate: boolean }>`
  position: fixed;
  bottom: ${({ elevate }) => (elevate ? '100px' : '47px')};
  right: 44px;
  z-index: ${(p) => p.theme.vars.zIndex.quickAccess};
`

export const Thumb = styled.div<{ open: boolean }>`
  ${(p) => p.theme.mixin.circleImage('72px')}
  ${(p) => p.theme.extend.flexCenter}
  transition: ${(p) => p.theme.vars.defaults.transition};
  transform: ${({ open }) => (open ? 'scale(0)' : 'scale(1)')};
  box-shadow: ${({ open }) =>
    open ? '0 0 0 #bdcedf' : '0px 4px 20px #bdcedf'};
  cursor: pointer;
  background-color: ${({ theme }) => theme.vars.colors.primary};
  color: white;
  svg {
    height: 36px;
    width: auto;
    display: block;
  }
`

export const RectInput = styled(FormInputLabeledUI)``
