import React, { useRef } from 'react'

import DataPagination from '../../../../../../components/data-pagination/data-pagination.component'
import { UseInvoice } from '../../../../../../hooks/api/invoices/useInvoice'
import { UsePagination } from '../../../../../../hooks/ui/usePagination'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { InvoiceType } from '../../../../../../types/invoice.type'
import { PaginationMetaType } from '../../../../../../types/pagination-meta.type'
import InvoiceCard from '../../../../../invoices/components/invoice-card/invoice-card.component'
import Styles from './financial-receivables-list.styles'

interface FinancialReceivablesListProps {
  data: InvoiceType[]
  meta: PaginationMetaType
  actions: UseInvoice & UsePagination
}

const FinancialReceivablesList = ({
  data,
  meta,
  actions
}: FinancialReceivablesListProps) => {
  const { t } = useTranslation()
  const head = useRef<HTMLDivElement>(null)
  return (
    <Styles ref={head}>
      {data?.length ? (
        <>
          {data.map((inv: InvoiceType) => (
            <InvoiceCard
              {...inv}
              key={inv.id}
              showMark
              showLink
              onMark={actions.onMarkPaid}
            />
          ))}
          <DataPagination
            page={meta.current_page}
            setPage={actions.onPage}
            total={meta.total}
            justify="center"
          />
        </>
      ) : !data.length ? (
        <p>{t('invoices:no-data')}</p>
      ) : null}
    </Styles>
  )
}

export default FinancialReceivablesList
