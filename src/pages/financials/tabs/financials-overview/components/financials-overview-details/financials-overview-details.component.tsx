import { Collapse } from 'antd'
import React from 'react'

import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { FinancialsSummaryType } from '../../../../../../types/financials'
import {
  getNewSalesNeeded,
  renderTargetIncome
} from '../../financials-overview.utils'
import Styles from './financials-overview-details.styles'

const { Panel } = Collapse

interface IProps {
  data: FinancialsSummaryType[]
  loading?: boolean
  onUpdateGoals: (value: string, type: string) => void
}

const OverviewDetails = ({ data, loading, onUpdateGoals }: IProps) => {
  const { t } = useTranslation()

  const getTableContent = (
    key: string,
    renderValue?: (data: FinancialsSummaryType) => string | React.ReactNode
  ) => {
    const renderableData = data.slice(0, data.length - 1)
    return (
      <table className="tabularData">
        {renderableData.map((d) => (
          <tr key={d.type}>
            <td>{d.revenue}</td>
            <td className="value">
              {renderValue ? renderValue(d) : (d as any)[key] || '-'}
            </td>
          </tr>
        ))}
      </table>
    )
  }

  return (
    <Styles>
      <div className="header">
        <h3>Detail Overview</h3>
      </div>
      <div className="content">
        {!loading ? (
          <Collapse ghost expandIconPosition="right">
            <Panel header={t('financials:overview.sales-completed')} key="1">
              {getTableContent('salesCompleted')}
            </Panel>
            <Panel header={t('financials:overview.average-rate')} key="2">
              {getTableContent('avgRate', ({ avgRate }) =>
                avgRate ? `${Math.ceil(avgRate)} AED` : '-'
              )}
            </Panel>
            <Panel header={t('financials:overview.monthly-booking')} key="3">
              {getTableContent('bookings')}
            </Panel>
            <Panel header={t('financials:overview.projected-income')} key="4">
              {getTableContent('projectedIncome', ({ projectedIncome }) =>
                projectedIncome ? `${Math.ceil(projectedIncome)} AED` : '-'
              )}
            </Panel>
            <Panel header={t('financials:overview.target-income')} key="5">
              {getTableContent(
                'targetIncome',
                ({ revenue, type, targetIncome, projectedIncome }) =>
                  renderTargetIncome(
                    revenue,
                    type,
                    targetIncome,
                    projectedIncome,
                    onUpdateGoals
                  )
              )}
            </Panel>
            <Panel header={t('financials:overview.new-sales')} key="6">
              {getTableContent(
                'newSales',
                ({ targetIncome, projectedIncome, avgRate }) =>
                  getNewSalesNeeded(targetIncome, projectedIncome, avgRate)
              )}
            </Panel>
          </Collapse>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    </Styles>
  )
}

export default OverviewDetails
