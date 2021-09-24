import React, { useState } from 'react'

import Drawer from '../../drawer/drawer.component'
import AddClientDrawerStyles from './add-client-drawer.styles'
import {
  ClientFormContext,
  clientFormSteps,
  ClientFormType,
  defaultValues
} from './add-client-modal.context'
import AddClientModalEmail from './add-client-modal-email/add-client-modal-email.component'
import AddClientModalForm from './add-client-modal-form/add-client-modal-form.component'
import AddClientModalMessage from './add-client-modal-message/add-client-modal-message.component'

type AddClientDrawerProps = {
  isOpen: boolean
  title: string
  onClose: () => void
  width?: string | number
  onSubmit?: () => void
}

export default function AddClientDrawer({
  isOpen,
  title,
  onClose,
  width,
  onSubmit
}: AddClientDrawerProps) {
  const [form, setFrom] = useState<ClientFormType>(defaultValues)
  const [step, setStep] = useState<number>(clientFormSteps.EMAIL)
  const update = (name: string, val: string) =>
    setFrom({
      ...form,
      [name]: val
    })
  const handleClose = () => {
    setStep(clientFormSteps.EMAIL)
    onClose()
  }
  return (
    <ClientFormContext.Provider
      value={{ form, update, step, setStep, onClose: handleClose }}
    >
      <Drawer open={isOpen} title={title} onClose={onClose} width={width}>
        <AddClientDrawerStyles>
          <div className="add-client-drawer__content">
            <div className="add-client-drawer__mask">
              <div
                className="add-client-drawer__body"
                style={{ right: `${Math.min(1, step) * 100}%` }}
              >
                <AddClientModalEmail />
                {step === clientFormSteps.MESSAGE ? (
                  <AddClientModalMessage onSubmit={onSubmit} />
                ) : null}
                {step === clientFormSteps.FORM ? (
                  <AddClientModalForm onSubmit={onSubmit} />
                ) : null}
              </div>
            </div>
          </div>
        </AddClientDrawerStyles>
      </Drawer>
    </ClientFormContext.Provider>
  )
}
