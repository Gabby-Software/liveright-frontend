import FinancialsOverviewLabel from '../../../financials/tabs/financials-overview/components/financials-overview-label/financials-overview-label.component'
import Select from '../../../../components/form/select/select.component'
import LineChart from '../../../../components/charts/line-chart/line-chart.component'
import Button from '../../../../components/buttons/button/button.component'
import Checkbox from '../../../../components/form/checkbox/checkbox.component'
import { TableWrapper } from '../table-wrapper/table-wrapper.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { formatChartData } from '../../../../utils/api/stat'
import { asMoney } from '../../../../pipes/as-money.pipe'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'

import { Styles } from './dashboard-revenue.styles'

const MOCK_DATA = [
  { from: 'Sessions', actual: '3,000 AED', target: '0 AED (+100%)' },
  { from: 'Coaching', actual: '3,000 AED', target: '0 AED (+100%)' },
  {
    from: 'Consultation',
    actual: '3,000 AED',
    target: '0 AED (+100%)'
  },
  { from: 'Other', actual: '3,000 AED', target: '0 AED (+100%)' }
]

const KEYS: string[] = ['from', 'actual', 'target']
const LABELS: string[] = ['clients:from', 'profile:actual', 'profile:target']

export const DashboardRevenue = () => {
  const { t } = useTranslation()
  const { statistic, chart, onRange, range } = useStatistic()
  const isMobile = useIsMobile()

  const chartData = formatChartData(chart, range)

  return (
    <Styles>
      <div className="dashboard-revenue">
        <h2 className={'f-overview__graph__title'}>
          {t('financials:overview.title')}
        </h2>
        <Button className="dashboard-revenue__button" type="button">
          Edit Goals
        </Button>
      </div>
      <div className="dashboard-revenue__cards">
        <FinancialsOverviewLabel
          label={'Projected Monthly Income'}
          value={asMoney(statistic.total || 0)}
          currency={'AED'}
        />
        <FinancialsOverviewLabel
          label={'Target Monthly Income'}
          value={'3.500'}
          currency={'AED'}
        />
      </div>
      <div className="dashboard-revenue">
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
      />
      <TableWrapper labels={LABELS} keys={KEYS} data={MOCK_DATA} />
    </Styles>
  )
}
