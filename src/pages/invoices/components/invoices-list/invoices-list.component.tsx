import { Skeleton } from 'antd'
import React, { useRef } from 'react'

import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { InvoiceType } from '../../../../types/invoice.type'
import { useInvoices } from '../../invoices.context'
import InvoiceCard from '../invoice-card/invoice-card.component'
import Styles from './invoices-list.styles'

interface InvoiceListProps {
  trainerFinancials?: boolean
}

const InvoicesList = ({ trainerFinancials }: InvoiceListProps) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const {
    current: { meta, data },
    filters,
    loading,
    error,
    update
  } = useInvoices()

  const head = useRef<HTMLDivElement>(null)

  const updatePage = (p: number) => {
    update(p, filters).then(() => {
      if (!head.current) return
      window.scrollTo({
        top: window.scrollY + head.current.getBoundingClientRect().top - 100,
        behavior: 'smooth'
      })
    })
  }

  return (
    <Styles ref={head}>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <p>{error}</p>
      ) : !data.length ? (
        <p>{t('invoices:no-data')}</p>
      ) : (
        <>
          {data.map((inv: InvoiceType) => (
            <InvoiceCard key={inv.id} {...inv} showMark={trainerFinancials} />
          ))}
          <DataPagination
            page={meta.current_page}
            setPage={updatePage}
            total={meta.total}
            justify={isMobile ? 'center' : 'end'}
          />
        </>
      )}
    </Styles>
  )
}

export default InvoicesList
