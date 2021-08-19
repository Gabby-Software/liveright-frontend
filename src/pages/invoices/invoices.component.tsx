import React from 'react'

import PageSubtitle from '../../components/titles/page-subtitle.styles'
import { onlyClient } from '../../guards/client.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import InvoiceFilters from './components/invoice-filters/invoice-filters.component'
import InvoicesAtention from './components/invoices-atention/invoices-atention.component'
import InvoicesList from './components/invoices-list/invoices-list.component'
import InvoicesTable from './components/invoices-table/invoices-table.component'
import { InvoicesProvider } from './invoices.context'
import Styles from './invoices.styles'

const Invoices = () => {
  const isMobile = useIsMobile()
  return (
    <Styles>
      <InvoicesAtention />
      <PageSubtitle>All your Invoice and billing history</PageSubtitle>

      <div className={'invoices__body'}>
        <InvoiceFilters />
        {isMobile ? <InvoicesList /> : <InvoicesTable />}
      </div>
    </Styles>
  )
}

export default Invoices
export const ClientInvoices = onlyClient(() => (
  <InvoicesProvider>
    <Invoices />
  </InvoicesProvider>
))
