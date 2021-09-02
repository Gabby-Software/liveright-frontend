import React from 'react'

import Card from '../../components/cards/card/card.component'
import { onlyClient } from '../../guards/client.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import InvoiceFilters from './components/invoice-filters/invoice-filters.component'
import InvoicesAtention from './components/invoices-atention/invoices-atention.component'
import InvoicesList from './components/invoices-list/invoices-list.component'
import InvoicesTable from './components/invoices-table/invoices-table.component'
import { InvoicesProvider } from './invoices.context'
import Styles from './invoices.styles'

const Invoices = () => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  return (
    <Styles>
      <h3 className="invoices__subtitle">{t('invoices:need-attention')}</h3>

      <InvoicesAtention />

      <h2 className="invoices__subtitle">{t('invoices:billing-history')}</h2>

      <Card>
        <InvoiceFilters />
        {isMobile ? <InvoicesList /> : <InvoicesTable />}
      </Card>
    </Styles>
  )
}

export default Invoices
export const ClientInvoices = onlyClient(() => (
  <InvoicesProvider>
    <Invoices />
  </InvoicesProvider>
))
