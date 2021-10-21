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
import { paymentMethods } from '../../../../enums/payment-method.enum'
import { UseInvoices } from '../../../../hooks/api/invoices/useInvoices'
import { useAuth } from '../../../../hooks/auth.hook'
import { UsePagination } from '../../../../hooks/ui/usePagination'
import fileManager from '../../../../managers/file.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { date } from '../../../../pipes/date.pipe'
import { invoices, payments } from '../../../../pipes/payments.pipe'
import { InvoiceType } from '../../../../types/invoice.type'
import { isClient } from '../../../../utils/api/auth'
import Styles from './invoices-table.styles'

const labels = [
  'invoices:invoice-number',
  'invoices:invoice-date',
  'invoices:issued-by',
  'invoices:price',
  'invoices:status',
  'invoices:options'
]
const keys = ['invoice_number', 'due_on', 'name', 'total', 'status', 'options']

interface InvoicesTableProps
  extends Pick<UseInvoices, 'invoices' | 'meta'>,
    Pick<UsePagination, 'onPage'> {}

export default function InvoicesTable({
  invoices: data,
  meta,
  onPage
}: InvoicesTableProps) {
  const { type } = useAuth()
  const { t } = useTranslation()

  const invoiceUser = (t: InvoiceType) =>
    isClient(type) ? t.invoice_from?.user : t.invoice_to?.user

  return (
    <Styles>
      <DataTable
        labels={labels}
        keys={keys}
        data={data}
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
          options: ({ status, id, pdf, payment_method }) => (
            <div className="invoice-table__actions">
              {[
                invoiceStatuses.OVERDUE,
                invoiceStatuses.DUE_SOON,
                invoiceStatuses.OUTSTANDING
              ].includes(status) &&
              payment_method === paymentMethods.CREDIT_CARD ? (
                <a href={payments(id)} className="invoice-table__link">
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

              <a href={invoices(id)}>
                <IconButton size="sm" className="invoice-table__action">
                  <InvoiceIcon />
                </IconButton>
              </a>
            </div>
          )
        }}
      />

      <div className="invoice-table__pagination">
        <DataPagination
          page={meta.current_page}
          total={meta.total}
          setPage={onPage}
        />
      </div>
    </Styles>
  )
}
