import React, { ReactElement, useMemo } from 'react'

import { EditIcon } from '../../../../../../assets/media/icons'
import DataTable from '../../../../../../components/data-table/data-table.component'
import EditableLabel from '../../../../../../components/form/editableLabel/editableLabel.component'
import {
  EmptyPlaceholder,
  LoadingPlaceholder
} from '../../../../../../components/placeholders'
import { FinancialsSummaryType } from '../../../../../../types/financials'
import Styles from './financials-overview-table.styles'

interface Props {
  data: FinancialsSummaryType[]
  renderOptions?: (invoice: any) => ReactElement
  loading?: boolean
  onUpdateGoals: (value: string, type: string) => void
}

const OverviewTable = (props: Props) => {
  const { data, renderOptions, loading, onUpdateGoals } = props

  const { labels, keys } = useMemo(() => {
    const labels = [
      'financials:overview.list-revenue',
      'financials:overview.sales-completed',
      'financials:overview.average-rate',
      'financials:overview.monthly-booking',
      'financials:overview.projected-income',
      'financials:overview.target-income',
      'financials:overview.new-sales'
    ]
    const keys = [
      'revenue',
      'salesCompleted',
      'avgRate',
      'bookings',
      'projectedIncome',
      'targetIncome',
      'newSales'
    ]

    if (renderOptions) {
      labels.push('financials:payout.options')
      keys.push('options')
    }

    return { labels, keys }
  }, [renderOptions, data])

  const totals = data?.[data.length - 1]

  const renderTargetIncome = (
    revenue: string,
    type: string,
    targetIncome: number,
    projectedIncome: number
  ) => (
    <EditableLabel
      label={Math.ceil(targetIncome).toString()}
      renderValue={
        <div>
          <span
            className={
              (revenue !== 'Total' &&
                (targetIncome > projectedIncome ? 'red' : 'green')) ||
              ''
            }
          >
            {Math.ceil(targetIncome)} AED
          </span>
          <EditIcon className="edit-icon" />
        </div>
      }
      onSave={(value: any) => {
        console.log(`Saving '${value}'`)
        onUpdateGoals(value, type)
      }}
      renderCheckBtn
    />
  )

  const getNewSalesNeeded = (
    targetIncome: number,
    projectedIncome: number,
    avgRate: number
  ) =>
    avgRate && targetIncome > projectedIncome
      ? Math.ceil((targetIncome - projectedIncome) / avgRate)
      : '-'

  return (
    <Styles>
      <DataTable
        labels={labels}
        keys={keys}
        data={data.slice(0, data.length - 1)}
        className="overviewTable"
        render={{
          salesCompleted: ({ salesCompleted }: FinancialsSummaryType) =>
            salesCompleted || '-',
          avgRate: ({ avgRate }: FinancialsSummaryType) =>
            avgRate ? `${Math.ceil(avgRate)} AED` : '-',
          bookings: ({ bookings }: FinancialsSummaryType) => bookings || '-',
          projectedIncome: ({ projectedIncome }: FinancialsSummaryType) =>
            projectedIncome ? `${Math.ceil(projectedIncome)} AED` : '-',
          targetIncome: ({
            revenue,
            type,
            targetIncome,
            projectedIncome
          }: FinancialsSummaryType) =>
            renderTargetIncome(revenue, type, targetIncome, projectedIncome),
          newSales: ({
            targetIncome,
            projectedIncome,
            avgRate
          }: FinancialsSummaryType) =>
            getNewSalesNeeded(targetIncome, projectedIncome, avgRate)
        }}
      >
        <tr className={'data-table__tr'}>
          <td className={'data-table__td'}>{totals.revenue}</td>
          <td className={'data-table__td'}></td>
          <td className={'data-table__td'}></td>
          <td className={'data-table__td'}></td>
          <td className={'data-table__td'}>{`${Math.ceil(
            totals.projectedIncome
          )} AED`}</td>
          <td className={'data-table__td'}>
            {renderTargetIncome(
              totals.revenue,
              totals.type,
              totals.targetIncome,
              totals.projectedIncome
            )}
          </td>
          <td className={'data-table__td'}></td>
        </tr>
      </DataTable>

      {loading ? (
        <LoadingPlaceholder spacing />
      ) : !data.length ? (
        <EmptyPlaceholder spacing />
      ) : null}
    </Styles>
  )
}

export default OverviewTable
