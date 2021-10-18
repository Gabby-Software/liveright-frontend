import React, { useState } from 'react'

import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import Drawer from '../../../drawer/drawer.component'
import AddClientForms from '../add-client-forms.component'
import {
  ClientFormContext,
  clientFormSteps,
  ClientFormType,
  defaultValues
} from '../add-client-modal.context'
import AddClientDrawerStyles from './add-client-drawer.styles'

// import AddClientModalEmail from './add-client-modal-email/add-client-modal-email.component'
// import AddClientModalForm from './add-client-modal-form/add-client-modal-form.component'
// import AddClientModalMessage from './add-client-modal-message/add-client-modal-message.component'

type AddClientDrawerProps = {
  isOpen: boolean
  title: string
  onClose: () => void
  width?: string | number
  onSubmit?: () => void
  setStep: (step: number) => void
  step: number
}

export default function AddClientDrawer({
  isOpen,
  title,
  onClose,
  width,
  onSubmit,
  setStep,
  step
}: AddClientDrawerProps) {
  const [form, setFrom] = useState<ClientFormType>(defaultValues)

  const isMobile = useIsMobile()

  const update = (name: string, val: string) =>
    setFrom({
      ...form,
      [name]: val
    })

  const handleClose = () => {
    setStep(clientFormSteps.EMAIL)
    onClose()
  }

  const content = (
    <AddClientDrawerStyles>
      <AddClientForms step={step} onSubmit={onSubmit} onClose={onClose} />
    </AddClientDrawerStyles>
  )

  return (
    <ClientFormContext.Provider
      value={{ form, update, step, setStep, onClose: handleClose }}
    >
      {isMobile ? (
        content
      ) : (
        <Drawer open={isOpen} title={title} onClose={onClose} width={width}>
          {content}
        </Drawer>
      )}
    </ClientFormContext.Provider>
  )
}
