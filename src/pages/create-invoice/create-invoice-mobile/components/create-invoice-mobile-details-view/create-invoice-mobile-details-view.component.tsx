import React from 'react'

import { CaretRightIcon } from '../../../../../assets/media/icons'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { useInvoiceForm } from '../../../create-invoice.context'
import { createInvoiceSteps } from '../../../create-invoice.data'
import Styles from './create-invoice-mobile-details-view.styles'

const CreateInvoiceMobileDetailsView = () => {
  const { values, setStep } = useInvoiceForm()
  const { t } = useTranslation()
  return (
    <Styles onClick={() => setStep(createInvoiceSteps.DETAILS)}>
      <div>
        <div className="ci-preview__row">
          <div className={'ci-preview__details'}>
            <span>Issued</span>
            <span className={'ci-preview__details__value'}>
              {values.invoice.issuance_date}
            </span>
          </div>
          <div className={'ci-preview__details'}>
            <span>Due</span>
            <span className={'ci-preview__details__value'}>
              {values.invoice.due_on}
            </span>
          </div>
        </div>

        <div className={'ci-preview__details'}>
          <span>Payment</span>
          <span className={'ci-preview__details__value'}>
            {t(`invoices:${values.invoice.payment_method}`)}
          </span>
        </div>
      </div>

      <CaretRightIcon />
    </Styles>
  )
}

export default CreateInvoiceMobileDetailsView
