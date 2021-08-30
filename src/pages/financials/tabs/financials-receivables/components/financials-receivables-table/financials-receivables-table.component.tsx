import { Popconfirm } from 'antd'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
import fileManager from '../../../../../../managers/file.manager'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { date } from '../../../../../../pipes/date.pipe'
import {
  ACTION_CANCEL_INVOICE_REQUEST,
  ACTION_GET_INVOICES_REQUEST,
  ACTION_MARK_INVOICE_AS_PAID
} from '../../../../../../store/action-types'
import { RootState } from '../../../../../../store/reducers'
import Styles from './financials-receivables-table.styles'

type Props = {}
const FinancialsReceivablesTable = ({}: Props) => {
  const {
    current: { data, meta },
    filters
  } = useSelector((state: RootState) => state.invoices)
  const dispatch = useDispatch()
  const head = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
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
  const cancelInvoice = (id: number) => {
    dispatch({
      type: ACTION_CANCEL_INVOICE_REQUEST,
      payload: {
        id,
        page: meta.current_page,
        filters,
        include: 'invoiceTo'
      }
    })
  }
  const updatePage = (p: number) => {
    dispatch({
      type: ACTION_GET_INVOICES_REQUEST,
      payload: {
        page: p,
        include: 'invoiceTo',
        filters,
        onSuccess: () => {
          if (!head.current) return
          window.scrollTo({
            top: window.scrollY + head.current.getBoundingClientRect().top,
            behavior: 'smooth'
          })
        }
      }
    })
  }
  const markAsPaid = (id: number) => {
    dispatch({
      type: ACTION_MARK_INVOICE_AS_PAID,
      payload: {
        id,
        page: meta?.current_page || 1,
        include: 'invoiceTo'
      }
    })
  }
  return (
    <Styles ref={head}>
      <DataTable
        className="invoice-table__table"
        labels={labels}
        data={data}
        keys={keys}
        render={{
          id: (t) => `#${t.id}`,
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
          options: ({ status, id, pdf }) => (
            <div className={'invoice-table__actions'}>
              {[
                invoiceStatuses.OVERDUE,
                invoiceStatuses.DUE_SOON,
                invoiceStatuses.OUTSTANDING
              ].includes(status) ? (
                <>
                  <span className={'invoice-table__link'}>
                    <Popconfirm
                      title={'Invoice will be marked as paid'}
                      onConfirm={() => markAsPaid(id)}
                    >
                      <Button variant="secondary" size="sm">
                        {t('invoices:mark-paid')}
                      </Button>
                    </Popconfirm>
                  </span>

                  <IconButton
                    size="sm"
                    onClick={() => fileManager.downloadUrl(pdf?.url)}
                    className="invoice-table__icon-btn"
                  >
                    <FilePdfIcon />
                  </IconButton>

                  <IconButton size="sm" className="invoice-table__icon-btn">
                    <SendIcon />
                  </IconButton>

                  <IconButton
                    size="sm"
                    to={Routes.INVOICES + '/' + id}
                    className="invoice-table__icon-btn"
                  >
                    <InvoiceIcon />
                  </IconButton>

                  <Popconfirm
                    title={t('invoices:confirm-delete')}
                    onConfirm={() => cancelInvoice(id)}
                  >
                    <IconButton
                      size="sm"
                      className="invoice-table__icon-btn invoice-table__icon-btn_red"
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Popconfirm>
                </>
              ) : [invoiceStatuses.PAID].includes(status) ? (
                <>
                  <IconButton
                    size="sm"
                    className="invoice-table__icon-btn"
                    onClick={() => fileManager.downloadUrl(pdf?.url)}
                  >
                    <DownloadIcon />
                  </IconButton>

                  <IconButton
                    className="invoice-table__icon-btn"
                    size="sm"
                    to={Routes.INVOICES + '/' + id}
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
          setPage={updatePage}
          total={meta.total}
        />
      </div>
    </Styles>
  )
}

export default FinancialsReceivablesTable
