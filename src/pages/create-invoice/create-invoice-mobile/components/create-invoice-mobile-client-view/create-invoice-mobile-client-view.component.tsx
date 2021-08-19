import React from 'react'

import { useInvoiceForm } from '../../../create-invoice.context'
import { createInvoiceSteps } from '../../../create-invoice.data'
import Styles from './create-invoice-mobile-client-view.styles'

const CreateInvoiceMobileClientView = () => {
  const { client, setStep } = useInvoiceForm()
  return (
    <Styles onClick={() => setStep(createInvoiceSteps.CLIENT)}>
      <span className={'ci-preview__client__label'}>to</span>
      <span className={'ci-preview__client__value'}>
        {client?.first_name} {client?.last_name}
      </span>
    </Styles>
  )
}

export default CreateInvoiceMobileClientView
