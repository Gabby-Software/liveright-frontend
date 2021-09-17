import { Popconfirm } from 'antd'
import React, { useRef } from 'react'

import {
  DeleteOutlinedIcon,
  DownloadIcon,
  FilePdfIcon,
  InvoiceIcon,
  SendIcon
} from '../../../../../../assets/media/icons'
import Button from '../../../../../../components/buttons/button/button.component'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import DataPagination from '../../../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../../../components/data-table/data-table.component'
import StatusBadge from '../../../../../../components/status-badge/status-badge.component'
import { invoiceStatuses } from '../../../../../../enums/invoice-statuses'
import { Routes } from '../../../../../../enums/routes.enum'
import { UseInvoice } from '../../../../../../hooks/api/invoices/useInvoice'
import { UsePagination } from '../../../../../../hooks/ui/usePagination'
import fileManager from '../../../../../../managers/file.manager'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { date } from '../../../../../../pipes/date.pipe'
import { InvoiceType } from '../../../../../../types/invoice.type'
import { PaginationMetaType } from '../../../../../../types/pagination-meta.type'
import Styles from './financials-receivables-table.styles'

const labels: string[] = [
  'invoices:invoice-number',
  'invoices:invoice-date',
  'invoices:client-name',
  'invoices:total',
  'invoices:invoice-due',
  'invoices:status',
  'invoices:options'
]
const keys = [
  'id',
  'created_at',
  'name',
  'total',
  'due_on',
  'status',
  'options'
]

interface FinancialsReceivablesTableProps {
  data: InvoiceType[]
  meta: PaginationMetaType
  actions: UseInvoice & UsePagination
}

const FinancialsReceivablesTable = ({
  data,
  meta,
  actions
}: FinancialsReceivablesTableProps) => {
  const head = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  return (
    <Styles ref={head}>
      <DataTable
        className="invoice-table__table"
        labels={labels}
        data={data}
        keys={keys}
        render={{
          id: (t) => `#${t.invoice_number}`,
          created_at: (t) => date(t.created_at),
          due_on: (t) => date(t.due_on),
          total: (t) => `${t.total} ${t.currency.code}`,
          name: (t) =>
            `${t.invoice_to?.user.first_name} ${t.invoice_to?.user.last_name}`,
          status: (item) => (
            <StatusBadge
              status={item.status?.toLowerCase()}
              className="invoice-table__status"
            >
              {t(`invoices:statuses.${item.status}`)}
            </StatusBadge>
          ),
          options: (invoice) => (
            <div className={'invoice-table__actions'}>
              {[
                invoiceStatuses.OVERDUE,
                invoiceStatuses.DUE_SOON,
                invoiceStatuses.OUTSTANDING,
                invoiceStatuses.DRAFT
              ].includes(invoice.status) ? (
                <>
                  <span className={'invoice-table__link'}>
                    {invoice.status === invoiceStatuses.DRAFT ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="invoice-table__send-btn"
                        onClick={() => actions.onSend(invoice.id)}
                        disabled={actions.isSendLoading}
                      >
                        {t('invoices:send-invoice')}
                      </Button>
                    ) : (
                      <Popconfirm
                        title={'Invoice will be marked as paid'}
                        onConfirm={() => actions.onMarkPaid(invoice.id)}
                      >
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={actions.isMarkLoading}
                        >
                          {t('invoices:mark-paid')}
                        </Button>
                      </Popconfirm>
                    )}
                  </span>

                  <IconButton
                    size="sm"
                    onClick={() => fileManager.downloadUrl(invoice.pdf?.url)}
                    className="invoice-table__icon-btn"
                  >
                    <FilePdfIcon />
                  </IconButton>

                  {invoice.status !== invoiceStatuses.DRAFT && (
                    <IconButton
                      size="sm"
                      className="invoice-table__icon-btn"
                      onClick={() =>
                        actions.onRemind(invoice.invoice_to?.uuid, invoice)
                      }
                    >
                      <SendIcon />
                    </IconButton>
                  )}

                  <IconButton
                    size="sm"
                    to={Routes.INVOICES + '/' + invoice.id}
                    className="invoice-table__icon-btn"
                  >
                    <InvoiceIcon />
                  </IconButton>

                  <Popconfirm
                    title={t('invoices:confirm-delete')}
                    onConfirm={() => actions.onCancel(invoice.id)}
                  >
                    <IconButton
                      size="sm"
                      className="invoice-table__icon-btn invoice-table__icon-btn_red"
                      disabled={actions.isCancelLoading}
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Popconfirm>
                </>
              ) : [invoiceStatuses.PAID].includes(invoice.status) ? (
                <>
                  <IconButton
                    size="sm"
                    className="invoice-table__icon-btn"
                    onClick={() => fileManager.downloadUrl(invoice.pdf?.url)}
                  >
                    <DownloadIcon />
                  </IconButton>

                  <IconButton
                    className="invoice-table__icon-btn"
                    size="sm"
                    to={Routes.INVOICES + '/' + invoice.id}
                  >
                    <InvoiceIcon />
                  </IconButton>
                </>
              ) : null}
            </div>
          )
        }}
      />

      <div className="invoice-table__pagination">
        <DataPagination
          page={meta.current_page}
          setPage={actions.onPage}
          total={meta.total}
        />
      </div>
    </Styles>
  )
}

export default FinancialsReceivablesTable
