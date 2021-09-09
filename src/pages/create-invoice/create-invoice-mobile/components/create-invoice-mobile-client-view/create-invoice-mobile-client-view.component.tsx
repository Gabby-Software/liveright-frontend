import React from 'react'

import { CaretRightIcon } from '../../../../../assets/media/icons'
import { useInvoiceForm } from '../../../create-invoice.context'
import { createInvoiceSteps } from '../../../create-invoice.data'
import Styles from './create-invoice-mobile-client-view.styles'

const CreateInvoiceMobileClientView = () => {
  const { client, setStep } = useInvoiceForm()
  return (
    <Styles onClick={() => setStep(createInvoiceSteps.CLIENT)}>
      <p>
        <span className={'ci-preview__client__label'}>To</span>
        <span className={'ci-preview__client__value'}>
          {client?.first_name} {client?.last_name}
        </span>
      </p>

      <CaretRightIcon />
    </Styles>
  )
}

export default CreateInvoiceMobileClientView
