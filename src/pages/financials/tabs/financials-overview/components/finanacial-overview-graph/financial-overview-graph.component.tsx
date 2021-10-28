import { useState } from 'react'

import { colors } from '../../../../../../assets/styles/_variables'
import LineChart from '../../../../../../components/charts/line-chart/line-chart.component'
import Checkbox from '../../../../../../components/form/checkbox/checkbox.component'
import Select from '../../../../../../components/form/select/select.component'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../../../enums/financials.enum'
import useStatistic from '../../../../../../hooks/api/stat/useStatistic'
import { useIsMobile } from '../../../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { formatChartData } from '../../../../../../utils/api/stat'
import Styles from './financial-overview-graph.style'

const FinancialsOverviewGraph = ({
  monthlyTarget
}: {
  monthlyTarget: number
}) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [showTarget, setShowTarget] = useState(false)
  const { chart, onRange, range } = useStatistic({
    range: statisticRange.YEAR
  })

  const chartData = formatChartData(chart, range, monthlyTarget, showTarget)

  return (
    <Styles className={'f-overview__graph'}>
      <div className={'f-overview__graph__title'}>
        <div className={'f-overview__graph__title-wrapper'}>
          <h2>{t('financials:overview.title')}</h2>
          <div className="f-overview__graph__checkbox">
            <label className="f-overview__graph__checkbox-label">
              <Checkbox
                value={showTarget}
                onChange={() => setShowTarget(!showTarget)}
              />
              Show Monthly Target
            </label>
          </div>
        </div>
        <div className={'f-overview__range'}>
          <Select
            id="financials-overview-period"
            options={statisticRangeOptions}
            onChange={onRange}
            defaultValue={statisticRange.MONTH}
          />
        </div>
      </div>
      <div className="f-overview__chart-container">
        <LineChart
          height={isMobile ? 210 : 300}
          data={chartData}
          xDataKey="date"
          dataKeys={showTarget ? ['value', 'target'] : ['value']}
          dataStroke={[colors.green_80, colors.yellow_80]}
        />
      </div>
    </Styles>
  )
}

export default FinancialsOverviewGraph
