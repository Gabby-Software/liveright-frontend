import { Link } from 'react-router-dom'

import Button from '../../../../components/buttons/button/button.component'
import LineChart from '../../../../components/charts/line-chart/line-chart.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import Select from '../../../../components/form/select/select.component'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import { Routes } from '../../../../enums/routes.enum'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useFinancialOverview } from '../../../../hooks/useFinancialOverview'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../pipes/as-money.pipe'
import { formatChartData } from '../../../../utils/api/stat'
import FinancialsOverviewLabel from '../../../financials/tabs/financials-overview/components/financials-overview-label/financials-overview-label.component'
import { TableWrapper } from '../table-wrapper/table-wrapper.component'
import { Styles } from './dashboard-revenue.styles'

const KEYS: string[] = ['revenue', 'projectedIncome', 'targetIncome']
const LABELS: string[] = ['financials:From', 'profile:Actual', 'profile:Target']

export const DashboardRevenue = () => {
  const { t } = useTranslation()
  const { chart, onRange, range } = useStatistic()
  const { monthlyRevenue, monthlyTarget, tableData } = useFinancialOverview()
  const isMobile = useIsMobile()

  const chartData = formatChartData(chart, range)
  const revenues = tableData.filter((item) => item.type)

  return (
    <Styles>
      <div className="dashboard-revenue">
        <h2 className={'dashboard-revenue__title'}>
          {t('financials:overview.title')}
        </h2>
        <Button className="dashboard-revenue__button" type="button">
          <Link to={Routes.FINANCIALS_OVERVIEW}>Edit Goals</Link>
        </Button>
      </div>
      <div className="dashboard-revenue__cards">
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
      </div>
      <div className="dashboard-revenue__chart-controller ">
        <div className="dashboard-revenue__checkbox">
          <label className="dashboard-revenue__checkbox-label">
            <Checkbox />
            Show Target
          </label>
        </div>
        <div>
          <Select
            id="financials-overview-period"
            options={statisticRangeOptions}
            onChange={onRange}
            defaultValue={statisticRange.WEEK}
          />
        </div>
      </div>
      <LineChart
        height={isMobile ? 210 : 300}
        data={chartData}
        xDataKey="date"
        dataKeys={['value']}
        range={range}
      />
      <TableWrapper labels={LABELS} keys={KEYS} data={revenues} />
    </Styles>
  )
}
