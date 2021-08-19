import { ModalProps } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { ReactComponent as TimesIcon } from '../../assets/media/icons/times.svg'
import { classes } from '../../pipes/classes.pipe'
import StyledModal from './modal.styles'

const Modal = ({
  children,
  visible,
  onCancel,
  large
}: ModalProps & { children: React.ReactNode; large?: boolean }) => {
  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      className={classes(large && 'modal__large')}
      footer={null}
      closeIcon={<TimesIcon className={'modal__times'} />}
    >
      {children}
    </StyledModal>
  )
}
const Title = styled.h1`
  ${(p) => p.theme.extend.h1};
  margin: 0px 0 40px 0;
  color: ${(p) => p.theme.vars.colors.primaryDark};
`
Modal.Title = Title

export default Modal
