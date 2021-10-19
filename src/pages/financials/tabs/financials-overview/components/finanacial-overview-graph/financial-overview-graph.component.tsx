import React from 'react'

import LineChart from '../../../../../../components/charts/line-chart/line-chart.component'
import Select from '../../../../../../components/form/select/select.component'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../../../enums/financials.enum'
import { useIsMobile } from '../../../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import Styles from './financial-overview-graph.style'

interface IProps {
  onRange: (range: string) => void
  chartData: any[]
}

const FinancialsOverviewGraph = ({ onRange, chartData }: IProps) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  return (
    <Styles className={'f-overview__graph'}>
      <div className={'f-overview__graph__title'}>
        <h2>{t('financials:overview.title')}</h2>
        <div className={'f-overview__range'}>
          <Select
            id="financials-overview-period"
            options={statisticRangeOptions}
            onChange={onRange}
            defaultValue={statisticRange.WEEK}
          />
        </div>
      </div>
      <div className="f-overview__chart-container">
        <LineChart
          height={isMobile ? 210 : 300}
          data={chartData}
          xDataKey="date"
          dataKeys={['value']}
        />
      </div>
    </Styles>
  )
}

export default FinancialsOverviewGraph
