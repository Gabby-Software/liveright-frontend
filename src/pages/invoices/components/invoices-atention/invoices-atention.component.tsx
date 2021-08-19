import React from 'react'

import Carousel from '../../../../components/carousel/carousel.component'
import Hr from '../../../../components/hr/hr.styles'
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import { InvoiceType } from '../../../../types/invoice.type'
import { useInvoices } from '../../invoices.context'
import InvoiceCard from '../invoice-card/invoice-card.component'

type Props = {}
const InvoicesAtention = ({}: Props) => {
  const { data } = useInvoices().needAttention
  if (!data?.length) return null
  return (
    <>
      <PageSubtitle>Need your attention</PageSubtitle>
      <Carousel>
        {data.map((inv: InvoiceType) => (
          <InvoiceCard key={inv.id} {...inv} />
        ))}
      </Carousel>
      <Hr />
    </>
  )
}

export default InvoicesAtention
