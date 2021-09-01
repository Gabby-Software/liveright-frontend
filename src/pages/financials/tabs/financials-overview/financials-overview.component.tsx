import React, { useState } from 'react'

import Card from '../../../../components/cards/card/card.component'
import LineChart from '../../../../components/charts/line-chart/line-chart.component'
import Select from '../../../../components/form/select/select.component'
import {
  chartRangeOptions,
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import FinancialsOverviewLabel from './components/financials-overview-label/financials-overview-label.component'
import Styles from './financials-overview.styles'

const data = [
  { value: 250, date: '03/07' },
  { value: 300, date: '04/07' },
  { value: 150, date: '05/07' },
  { value: 0, date: '06/07' },
  { value: 120, date: '07/07' },
  { value: 270, date: '08/07' },
  { value: 320, date: '09/07' },
  { value: 300, date: '10/07' },
  { value: 210, date: '11/07' },
  { value: 280, date: '12/07' },
  { value: 180, date: '13/07' },
  { value: 170, date: '14/07' },
  { value: 300, date: '15/07' },
  { value: 200, date: '16/07' },
  { value: 250, date: '17/07' },
  { value: 200, date: '18/07' },
  { value: 250, date: '19/07' },
  { value: 300, date: '20/07' },
  { value: 450, date: '21/07' },
  { value: 450, date: '22/07' },
  { value: 450, date: '23/07' },
  { value: 300, date: '24/07' }
]

type Props = {}

const FinancialsOverview = ({}: Props) => {
  const [range, setRange] = useState<string>(statisticRange.MONTH)
  const { t } = useTranslation()
  return (
    <Styles>
      <div className={'f-overview__range'}>
        <Select
          id="financials-overview-period"
          options={statisticRangeOptions}
          value={range}
          onChange={setRange}
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
              data={data}
              xDataKey="date"
              dataKeys={['value']}
            />
          </div>
        </div>
        <div className={'f-overview__graph__right'}>
          <Select
            id="chart-range"
            options={chartRangeOptions}
            defaultValue="day"
            className="f-overview__chart-range"
          />

          <FinancialsOverviewLabel
            label={t('financials:overview.current')}
            value={1000}
            currency={'AED'}
            green
          />
          <FinancialsOverviewLabel
            label={t('financials:overview.goal')}
            value={400}
            currency={'AED'}
          />
        </div>
      </Card>
    </Styles>
  )
}

export default FinancialsOverview
