import React from 'react'

import Card from '../../components/cards/card/card.component'
import { onlyClient } from '../../guards/client.guard'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import InvoiceFilters from './components/invoice-filters/invoice-filters.component'
import InvoicesAtention from './components/invoices-atention/invoices-atention.component'
import InvoicesList from './components/invoices-list/invoices-list.component'
import InvoicesTable from './components/invoices-table/invoices-table.component'
import { InvoicesProvider } from './invoices.context'
import Styles from './invoices.styles'

interface InvoicesProps {
  asPage?: boolean
  trainerFinancials?: boolean
}

const Invoices = ({ asPage = true, trainerFinancials }: InvoicesProps) => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()

  const content = (
    <Styles>
      <h3 className="invoices__subtitle">{t('invoices:need-attention')}</h3>

      <InvoicesAtention />

      <h2 className="invoices__subtitle">{t('invoices:billing-history')}</h2>

      {isMobile ? (
        <>
          <InvoiceFilters />
          <InvoicesList trainerFinancials={trainerFinancials} />
        </>
      ) : (
        <Card>
          <InvoiceFilters />
          <InvoicesTable />
        </Card>
      )}
    </Styles>
  )

  return isMobile && asPage ? (
    <MobilePage title={t('invoices')}>{content}</MobilePage>
  ) : (
    content
  )
}

export default Invoices

export const ClientInvoices = onlyClient(() => (
  <InvoicesProvider>
    <Invoices />
  </InvoicesProvider>
))
