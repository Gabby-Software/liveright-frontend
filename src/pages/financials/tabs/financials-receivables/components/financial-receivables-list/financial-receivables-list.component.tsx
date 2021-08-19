import { Skeleton } from 'antd'
import React, { useRef } from 'react'

import DataPagination from '../../../../../../components/data-pagination/data-pagination.component'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { InvoiceType } from '../../../../../../types/invoice.type'
import { useInvoices } from '../../../../../invoices/invoices.context'
import FinancialReceivablesListItem from '../financial-receivables-list-item/financial-receivables-list-item.component'
import Styles from './financial-receivables-list.styles'

type Props = {}
const FinancialReceivablesList = ({}: Props) => {
  const { t } = useTranslation()
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
      {data?.length ? (
        <>
          {data.map((inv: InvoiceType) => (
            <FinancialReceivablesListItem {...inv} key={inv.id} />
          ))}
          <DataPagination
            page={meta.current_page}
            setPage={updatePage}
            total={meta.total}
          />
        </>
      ) : loading ? (
        <Skeleton />
      ) : error ? (
        <p>{error}</p>
      ) : !data.length ? (
        <p>{t('invoices:no-data')}</p>
      ) : null}
    </Styles>
  )
}

export default FinancialReceivablesList
