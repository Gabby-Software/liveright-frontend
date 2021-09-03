import React from 'react'

import Card from '../../../../components/cards/card/card.component'
import LineChart from '../../../../components/charts/line-chart/line-chart.component'
import Select from '../../../../components/form/select/select.component'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import useStatistic from '../../../../hooks/api/stat/useStatistic'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { asMoney } from '../../../../pipes/as-money.pipe'
import { formatChartData } from '../../../../utils/api/stat'
import FinancialsOverviewLabel from './components/financials-overview-label/financials-overview-label.component'
import Styles from './financials-overview.styles'

type Props = {}

const FinancialsOverview = ({}: Props) => {
  const { t } = useTranslation()
  const { statistic, chart, onRange, range } = useStatistic()
  const chartData = formatChartData(chart, range)
  return (
    <Styles>
      <div className={'f-overview__range'}>
        <Select
          id="financials-overview-period"
          options={statisticRangeOptions}
          onChange={onRange}
          defaultValue={statisticRange.WEEK}
        />
      </div>

      <Card className={'f-overview__graph'}>
        <div className={'f-overview__graph__left'}>
          <h2 className={'f-overview__graph__title'}>
            {t('financials:overview.title')}
          </h2>

          <div className="f-overview__chart-container">
            <LineChart
              height={300}
              data={chartData}
              xDataKey="date"
              dataKeys={['value']}
            />
          </div>
        </div>
        <div className={'f-overview__graph__right'}>
          <FinancialsOverviewLabel
            label={t('financials:overview.current')}
            value={asMoney(statistic.total || 0)}
            currency={'AED'}
            green
          />
          <FinancialsOverviewLabel
            label={t('financials:overview.goal')}
            value={'400'}
            currency={'AED'}
          />
        </div>
      </Card>
    </Styles>
  )
}

export default FinancialsOverview
