import { Skeleton } from 'antd'
import React, { useRef } from 'react'

import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import logger from '../../../../managers/logger.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { InvoiceType } from '../../../../types/invoice.type'
import { useInvoices } from '../../invoices.context'
import InvoicesListItem from '../invoices-list-item/invoices-list-item.component'
import Styles from './invoices-list.styles'

const InvoicesList = () => {
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
  logger.info(
    window.scrollY,
    head.current,
    head.current?.getBoundingClientRect().top,
    head.current?.offsetTop
  )
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
            <InvoicesListItem {...inv} key={inv.id} />
          ))}
          <DataPagination
            page={meta.current_page}
            setPage={updatePage}
            total={meta.total}
          />
        </>
      )}
    </Styles>
  )
}

export default InvoicesList
