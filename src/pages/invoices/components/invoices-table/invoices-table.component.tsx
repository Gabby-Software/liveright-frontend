import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { ReactComponent as InvoiceIcon } from '../../../../assets/media/icons/invoice.svg'
import { ReactComponent as PDFIcon } from '../../../../assets/media/icons/pdf.svg'
import { ReactComponent as ReceiptIcon } from '../../../../assets/media/icons/receipt.svg'
import DataTable from '../../../../components/data-table/data-table.component'
import FormButton from '../../../../components/forms/form-button/form-button.component'
import TablePagination from '../../../../components/table-pagination/table-pagination.component'
import { invoiceStatuses } from '../../../../enums/invoice-statuses'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import fileManager from '../../../../managers/file.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { capitalize } from '../../../../pipes/capitalize.pipe'
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch()
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
        render={{
          invoice_number: (t) => `#${t.id}`,
          due_on: (t) => date(t.due_on),
          total: (t) => `${t.total} ${t.currency.code}`,
          name: (t) =>
            `${invoiceUser(t)?.first_name} ${invoiceUser(t)?.last_name}`,
          status: (t) => (
            <div
              className={`invoice-table__status__${t.status?.toLowerCase()}`}
            >
              {capitalize(t.status)}
            </div>
          ),
          options: ({ status, id, pdf }) => (
            <div className={'invoice-table__actions'}>
              {[
                invoiceStatuses.OVERDUE,
                invoiceStatuses.DUE_SOON,
                invoiceStatuses.OUTSTANDING
              ].includes(status) ? (
                <a
                  href={payments(Routes.INVOICES) + '/' + id}
                  className={'invoice-table__link'}
                >
                  <FormButton type={'primary'}>
                    {t('invoices:settle-now')}
                  </FormButton>
                </a>
              ) : [invoiceStatuses.PAID].includes(status) ? (
                <InvoiceIcon
                  className={'invoice-table__action'}
                  onClick={() => fileManager.downloadUrl(pdf.url)}
                />
              ) : null}
              <PDFIcon
                className={'invoice-table__action'}
                onClick={() => fileManager.downloadUrl(pdf.url)}
              />
              <Link
                to={Routes.INVOICES + '/' + id}
                className={'invoice-table__action'}
              >
                <ReceiptIcon />
              </Link>
            </div>
          )
        }}
      />
      <TablePagination
        page={meta.current_page}
        setPage={updatePage}
        total={meta.total}
      />
    </Styles>
  )
}

export default InvoicesTable
