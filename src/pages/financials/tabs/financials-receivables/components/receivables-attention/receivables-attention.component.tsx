import React from 'react'
import { useSelector } from 'react-redux'

import Carousel from '../../../../../../components/carousel/carousel.component'
import Hr from '../../../../../../components/hr/hr.styles'
import PageSubtitle from '../../../../../../components/titles/page-subtitle.styles'
import { RootState } from '../../../../../../store/reducers'
import { InvoiceType } from '../../../../../../types/invoice.type'
import ReceivablesAttentionItem from '../receivables-attention-item/receivables-attention-item.component'

type Props = {}
const ReceivablesAttention = ({}: Props) => {
  const { data } = useSelector(
    (state: RootState) => state.invoices.needAttention
  )
  if (!data.length) return null
  return (
    <>
      <PageSubtitle>Need your attention</PageSubtitle>
      <Carousel>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        {data.map((inv: InvoiceType, i: number) => (
          <ReceivablesAttentionItem key={inv.id} {...inv} />
        ))}
      </Carousel>
      <Hr />
    </>
  )
}

export default ReceivablesAttention
