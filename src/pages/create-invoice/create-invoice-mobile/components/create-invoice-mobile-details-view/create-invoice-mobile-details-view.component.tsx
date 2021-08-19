import React from 'react'

import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { date } from '../../../../../pipes/date.pipe'
import { useInvoiceForm } from '../../../create-invoice.context'
import { createInvoiceSteps } from '../../../create-invoice.data'
import Styles from './create-invoice-mobile-details-view.styles'

const CreateInvoiceMobileDetailsView = () => {
  const { values, setStep } = useInvoiceForm()
  const { t } = useTranslation()
  return (
    <Styles onClick={() => setStep(createInvoiceSteps.DETAILS)}>
      <div className={'ci-preview__details'}>
        <span>issued</span>
        <span className={'ci-preview__details__value'}>
          {date(values.invoice.issuance_date)}
        </span>
      </div>
      <div className={'ci-preview__details'}>
        <span>due</span>
        <span className={'ci-preview__details__value'}>
          {date(values.invoice.due_on)}
        </span>
      </div>
      <div className={'ci-preview__details'}>
        <span>pay by</span>
        <span className={'ci-preview__details__value'}>
          {t(`invoices:${values.invoice.payment_method}`)}
        </span>
      </div>
    </Styles>
  )
}

export default CreateInvoiceMobileDetailsView
