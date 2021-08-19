import React, { useState } from 'react'

import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { InvoiceFormType } from '../../../types/invoice-form.type'
import Modal from '../../modal/modal.component'
import Steps from '../../steps/steps.component'
import { initialValues, InvoiceContext } from './add-invoice-modal.context'
import Styles from './add-invoice-modal.styles'
import AddInvoiceModal1 from './add-invoice-modal-1/add-invoice-modal-1.component'
import AddInvoiceModal2 from './add-invoice-modal-2/add-invoice-modal-2.component'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export enum invoiceSteps {
  DETAILS,
  PRICE
}

const AddInvoiceModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation()
  const [step, setStep] = useState(invoiceSteps.DETAILS)
  const [form, setForm] = useState<InvoiceFormType>(initialValues)
  const handleClose = () => {
    setStep(invoiceSteps.DETAILS)
    onClose()
  }
  const update = (name: string, value: any) =>
    setForm({ ...form, [name]: value })
  return (
    <Modal visible={isOpen} onCancel={handleClose}>
      <Styles>
        <h1 className={'add-invoice__title'}>{t('invoices:add')}</h1>
        <InvoiceContext.Provider
          value={{ form, update, step, setStep, onClose: handleClose }}
        >
          <Steps currentStep={step}>
            <Steps.Step>
              <AddInvoiceModal1 />
            </Steps.Step>
            <Steps.Step>
              <AddInvoiceModal2 />
            </Steps.Step>
          </Steps>
        </InvoiceContext.Provider>
      </Styles>
    </Modal>
  )
}

export default AddInvoiceModal
