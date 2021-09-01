import React, { useState } from 'react'

import Card from '../../../../components/cards/card/card.component'
import Select from '../../../../components/form/select/select.component'
import {
  chartRangeOptions,
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import FinancialsOverviewLabel from './components/financials-overview-label/financials-overview-label.component'
// import { statsData } from './financials-overview.data'
import Styles from './financials-overview.styles'

type Props = {}
const FinancialsOverview = ({}: Props) => {
  const [range, setRange] = useState<string>(statisticRange.MONTH)
  // const data = useMemo(() => statsData[range], [range])
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

          {/*<div className={'f-overview__graph__body'}>*/}
          {/*  <LineGraph*/}
          {/*    startDate={data.from}*/}
          {/*    endDate={data.to}*/}
          {/*    minValue={Math.min(...data.actual, ...data.goal)}*/}
          {/*    maxValue={Math.max(...data.actual, ...data.goal)}*/}
          {/*  >*/}
          {/*    <LineGraph.Chart color={'#FF8515'} data={data.goal} />*/}
          {/*    <LineGraph.Chart color={'#4F6CDE'} data={data.actual} />*/}
          {/*  </LineGraph>*/}
          {/*</div>*/}
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
