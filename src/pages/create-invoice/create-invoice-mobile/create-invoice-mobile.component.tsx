import React from 'react'

import { Routes } from '../../../enums/routes.enum'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import {
  CreateInvoiceProvider,
  useInvoiceForm
} from '../create-invoice.context'
import { createInvoiceSteps } from '../create-invoice.data'
import CreateInvoiceMobileClient from './components/create-invoice-mobile-client/create-invoice-mobile-client.component'
import CreateInvoiceMobileDetails from './components/create-invoice-mobile-details/create-invoice-mobile-details.component'
import CreateInvoiceMobileItems from './components/create-invoice-mobile-items/create-invoice-mobile-items.component'
import CreateInvoiceMobileNotes from './components/create-invoice-mobile-notes/create-invoice-mobile-notes.component'
import Styles from './create-invoice-mobile.styles'

const CreateInvoiceMobileContent = () => {
  const { step } = useInvoiceForm()
  const { t } = useTranslation()
  const steps: { [key: number]: React.ReactNode } = {
    [createInvoiceSteps.CLIENT]: <CreateInvoiceMobileClient />,
    [createInvoiceSteps.DETAILS]: <CreateInvoiceMobileDetails />,
    [createInvoiceSteps.ITEMS]: <CreateInvoiceMobileItems />,
    [createInvoiceSteps.NOTES]: <CreateInvoiceMobileNotes />
  }
  return (
    <MobilePage
      title={t('invoices:create-new')}
      headerTopComponent={
        <HeaderLink to={Routes.FINANCIALS_OVERVIEW}>
          {t('invoices:return-financials')}
        </HeaderLink>
      }
    >
      <Styles>{steps[step]}</Styles>
    </MobilePage>
  )
}
const CreateInvoiceMobile = () => (
  <CreateInvoiceProvider>
    <CreateInvoiceMobileContent />
  </CreateInvoiceProvider>
)
export default CreateInvoiceMobile
