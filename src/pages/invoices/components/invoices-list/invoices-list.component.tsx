import DataPagination from '../../../../components/data-pagination/data-pagination.component'
import { UseInvoices } from '../../../../hooks/api/invoices/useInvoices'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { UsePagination } from '../../../../hooks/ui/usePagination'
import { InvoiceType } from '../../../../types/invoice.type'
import InvoiceCard from '../invoice-card/invoice-card.component'
import Styles from './invoices-list.styles'

interface InvoiceListProps
  extends Pick<UseInvoices, 'invoices' | 'meta'>,
    Pick<UsePagination, 'onPage'> {
  trainerFinancials?: boolean
}

export default function InvoicesList({
  trainerFinancials,
  invoices: data,
  meta,
  onPage
}: InvoiceListProps) {
  const isMobile = useIsMobile()
  return (
    <Styles>
      {data.map((inv: InvoiceType) => (
        <InvoiceCard key={inv.id} {...inv} showMark={trainerFinancials} />
      ))}

      <DataPagination
        page={meta.current_page}
        setPage={onPage}
        total={meta.total}
        justify={isMobile ? 'center' : 'end'}
      />
    </Styles>
  )
}
