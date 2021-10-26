import moment from 'moment'
import React, { ReactElement, useMemo } from 'react'

import Card from '../../../../../../components/cards/card/card.component'
import DataPagination from '../../../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../../../components/data-table/data-table.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../../../components/placeholders'
import UserBadge from '../../../../../../components/user-badge/user-badge.component'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { invoices } from '../../../../../../pipes/payments.pipe'
import { PaginationMetaType } from '../../../../../../types/pagination-meta.type'
import {
  PayoutFilters,
  PayoutTransaction
} from '../../../../../../types/payoutTransaction'
import GetPaidFilters from '../filters/filters.component'

interface Props {
  data: PayoutTransaction[]
  meta: PaginationMetaType
  renderOptions?: (invoice: any) => ReactElement
  withFilter?: boolean
  FilterProps?: any
  loading?: boolean
  filters: PayoutFilters
  onPage: (page: number) => void
  onFilter: (filters: PayoutFilters) => void
}

const GetPaidTable = (props: Props) => {
  const {
    data,
    meta,
    renderOptions,
    withFilter,
    loading,
    onPage,
    onFilter,
    filters
  } = props
  const { t } = useTranslation()

  const { labels, keys } = useMemo(() => {
    const labels = [
      'financials:payout.username',
      'financials:payout.eventType',
      'financials:payout.amount',
      'financials:payout.date',
      'financials:payout.options'
    ]
    const keys = ['username', 'eventType', 'amount', 'date', 'options']

    return { labels, keys }
  }, [renderOptions])

  return (
    <Card className="payoutTable">
      <h2 className="payoutTable__title">{t('financials:payout.title')}</h2>
      {withFilter && <GetPaidFilters onFilter={onFilter} filters={filters} />}
      <br />
      <DataTable
        labels={labels}
        keys={keys}
        data={data}
        className="payoutTable__table"
        render={{
          username: ({ user: { firstName, lastName } }: PayoutTransaction) => {
            return <UserBadge firstName={firstName} lastName={lastName} />
          },
          eventType: ({ type }: PayoutTransaction) => {
            return type[0].toUpperCase() + type.substr(1)
          },
          amount: ({ amount, currency }: PayoutTransaction) => {
            return `${Math.abs(amount)} ${currency.toUpperCase()}`
          },
          date: ({ date }: PayoutTransaction) => {
            // date are given in seconds. Need to convert in ms before use.
            return moment(date).format('YYYY-MM-DD')
          },
          options: (item: PayoutTransaction) =>
            renderOptions ? (
              renderOptions(item)
            ) : (
              <a href={invoices(item.invoiceId)}>View Invoice</a>
            )
        }}
      />

      {loading ? (
        <LoadingPlaceholder spacing />
      ) : !data.length ? (
        <EmptyPlaceholder spacing />
      ) : null}

      <DataPagination
        page={meta.current_page}
        setPage={onPage}
        total={meta.total}
        perPage={meta.per_page}
      />
    </Card>
  )
}

export default GetPaidTable
