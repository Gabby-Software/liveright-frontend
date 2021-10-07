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
import { PaginationMetaType } from '../../../../../../types/pagination-meta.type'
import GetPaidFilters from '../filters/filters.component'

interface Props {
  data: any[]
  meta: PaginationMetaType
  renderOptions?: (invoice: any) => ReactElement
  withFilter?: boolean
  FilterProps?: any
  loading?: boolean
  onPage: (page: number) => void
}

const GetPaidTable = (props: Props) => {
  const { data, meta, renderOptions, withFilter, loading, onPage } = props
  const { t } = useTranslation()

  const { labels, keys } = useMemo(() => {
    const labels = [
      'financials:payout.username',
      'financials:payout.eventType',
      'financials:payout.amount',
      'financials:payout.dateRecieved',
      'financials:payout.datePayout'
    ]
    const keys = [
      'username',
      'eventType',
      'amount',
      'dateRecieved',
      'datePayout'
    ]

    if (renderOptions) {
      labels.push('financials:payout.options')
      keys.push('options')
    }

    return { labels, keys }
  }, [renderOptions])

  return (
    <Card className="payoutTable">
      <h2 className="payoutTable__title">{t('financials:payout.title')}</h2>
      {withFilter && <GetPaidFilters />}
      <br />
      <DataTable
        labels={labels}
        keys={keys}
        data={data}
        className="payoutTable__table"
        render={{
          username: (it) => {
            return (
              <UserBadge
                avatar={it.user.avatar?.url}
                firstName={it?.user.firstName}
                lastName={it?.user.lastName}
              />
            )
          },
          eventType: ({ type }) => {
            return type
          },
          amount: ({ amount, currency }) => {
            return `${amount} ${currency.toUpperCase()}`
          },
          dateRecieved: ({ dateRecieved }) => {
            return moment(dateRecieved).format('YYYY-MM-DD')
          },
          datePayout: ({ datePayout }) => {
            return moment(datePayout).format('YYYY-MM-DD')
          },
          options: (item) =>
            renderOptions ? renderOptions(item) : React.Fragment
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
      />
    </Card>
  )
}

export default GetPaidTable
