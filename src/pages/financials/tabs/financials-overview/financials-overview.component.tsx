import React from 'react'

import Button from '../../../../components/buttons/button/button.component'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useFinancialOverview } from '../../../../hooks/useFinancialOverview'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../pipes/as-money.pipe'
import { formatChartData } from '../../../../utils/api/stat'
import FinancialsOverviewGraph from './components/finanacial-overview-graph/financial-overview-graph.component'
import OverviewDetails from './components/financials-overview-details/financials-overview-details.component'
import FinancialsOverviewLabel from './components/financials-overview-label/financials-overview-label.component'
import OverviewTable from './components/financials-overview-table/financials-overview-table.component'
import GoalsSuggestions from './components/goals-sugggestions/goals-suggestions.component'
import Styles from './financials-overview.styles'

type Props = {}

const FinancialsOverview = ({}: Props) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const { chart, onRange, range } = useStatistic()
  const { monthlyRevenue, monthlyTarget, tableData, onUpdateGoals } =
    useFinancialOverview()

  const chartData = formatChartData(chart, range)

  const cards = (
    <>
      <FinancialsOverviewLabel
        label={t('financials:overview.projected-monthly-income')}
        value={asMoney(Math.ceil(monthlyRevenue || 0))}
        currency={'AED'}
      />
      <FinancialsOverviewLabel
        label={t('financials:overview.target-monthly-income')}
        value={asMoney(Math.ceil(monthlyTarget || 0))}
        note={asMoney(Math.ceil(monthlyRevenue - monthlyTarget))}
        currency={'AED'}
        green={monthlyTarget <= monthlyRevenue}
      />
    </>
  )

  return (
    <Styles>
      {<div className="f-overview__cards">{cards}</div>}
      {isMobile ? (
        <OverviewDetails data={tableData} onUpdateGoals={onUpdateGoals} />
      ) : (
        <OverviewTable data={tableData} onUpdateGoals={onUpdateGoals} />
      )}
      <FinancialsOverviewGraph onRange={onRange} chartData={chartData} />
      {isMobile && (
        <Button variant="secondary" className="f-overview__view-btn">
          {t('financials:view-graph')}
        </Button>
      )}
      <div className="divider"></div>
      <GoalsSuggestions />
    </Styles>
  )
}

export default FinancialsOverview
