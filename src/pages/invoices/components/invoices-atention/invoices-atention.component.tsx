import React from 'react'

import Carousel from '../../../../components/carousel/carousel.component'
import Hr from '../../../../components/hr/hr.styles'
import useInvoices from '../../../../hooks/api/invoices/useInvoices'
import { InvoiceType } from '../../../../types/invoice.type'
import InvoiceCard from '../invoice-card/invoice-card.component'
import Styles from './invoices-atention.styles'

interface InvoicesAtentionProps {}

const InvoicesAtention = ({}: InvoicesAtentionProps) => {
  const { invoices } = useInvoices({
    initialFilters: {
      status: 'due_soon,overdue'
    },
    initialInclude: 'invoiceTo'
  })

  if (!invoices.length) return null

  return (
    <Styles>
      <Carousel>
        {invoices.map((inv: InvoiceType) => (
          <InvoiceCard mobileColumn key={inv.id} {...inv} />
        ))}
      </Carousel>

      <Hr className="invoices-attention__divider" />
    </Styles>
  )
}

export default InvoicesAtention
