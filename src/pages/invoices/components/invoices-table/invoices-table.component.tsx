import React, { useRef } from 'react'

import {
  DownloadIcon,
  FilePdfIcon,
  InvoiceIcon
} from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../components/data-table/data-table.component'
import StatusBadge from '../../../../components/status-badge/status-badge.component'
import { invoiceStatuses } from '../../../../enums/invoice-statuses'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import fileManager from '../../../../managers/file.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { date } from '../../../../pipes/date.pipe'
import { payments } from '../../../../pipes/payments.pipe'
import { InvoiceType } from '../../../../types/invoice.type'
import { useInvoices } from '../../invoices.context'
import Styles from './invoices-table.styles'

const InvoicesTable = () => {
  const { type } = useAuth()
  const head = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const {
    current: { meta, data },
    filters,
    error,
    loading,
    update
  } = useInvoices()

  const updatePage = (p: number) => {
    update(p, filters).then(() => {
      if (!head.current) return
      window.scrollTo({
        top: window.scrollY + head.current.getBoundingClientRect().top,
        behavior: 'smooth'
      })
    })
  }

  const labels = [
    'invoices:invoice-number',
    'invoices:invoice-date',
    'invoices:issued-by',
    'invoices:price',
    'invoices:status',
    'invoices:options'
  ]
  const keys = [
    'invoice_number',
    'due_on',
    'name',
    'total',
    'status',
    'options'
  ]

  const invoiceUser = (t: InvoiceType) =>
    type === userTypes.CLIENT ? t.invoice_from?.user : t.invoice_to?.user

  return (
    <Styles ref={head}>
      <DataTable
        labels={labels}
        keys={keys}
        data={data}
        error={error || (!loading && !data.length) ? t('invoices:no-data') : ''}
        loading={loading}
        className="invoice-table__table"
        render={{
          invoice_number: (t) => `#${t.invoice_number}`,
          due_on: (t) => date(t.due_on),
          total: (t) => `${t.total} ${t.currency.code}`,
          name: (t) =>
            `${invoiceUser(t)?.first_name} ${invoiceUser(t)?.last_name}`,
          status: ({ status }) => {
            return (
              <StatusBadge
                status={status?.toLowerCase()}
                className="invoice-table__status"
              >
                {t(`invoices:statuses.${status}`)}
              </StatusBadge>
            )
          },
          options: ({ status, id, pdf }) => (
            <div className="invoice-table__actions">
              {[
                invoiceStatuses.OVERDUE,
                invoiceStatuses.DUE_SOON,
                invoiceStatuses.OUTSTANDING
              ].includes(status) ? (
                <a
                  href={payments(`${Routes.INVOICES}/${id}/pay`)}
                  className="invoice-table__link"
                >
                  <Button variant="secondary" size="sm">
                    {t('invoices:settle-now')}
                  </Button>
                </a>
              ) : [invoiceStatuses.PAID].includes(status) ? (
                <IconButton
                  size="sm"
                  className="invoice-table__action"
                  onClick={() => fileManager.downloadUrl(pdf.url)}
                >
                  <DownloadIcon />
                </IconButton>
              ) : null}

              <IconButton
                size="sm"
                className="invoice-table__action"
                onClick={() => fileManager.downloadUrl(pdf.url)}
              >
                <FilePdfIcon />
              </IconButton>

              <IconButton
                size="sm"
                to={Routes.INVOICES + '/' + id}
                className="invoice-table__action"
              >
                <InvoiceIcon />
              </IconButton>
            </div>
          )
        }}
      />

      <div className="invoice-table__pagination">
        <DataPagination
          page={meta.current_page}
          setPage={updatePage}
          total={meta.total}
        />
      </div>
    </Styles>
  )
}

export default InvoicesTable
