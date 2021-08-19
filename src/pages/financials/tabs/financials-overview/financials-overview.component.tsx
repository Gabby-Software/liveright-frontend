import React, { useMemo, useState } from 'react'

import Card from '../../../../components/card/card.style'
import { FormSelectUI } from '../../../../components/forms/form-select/form-select.component'
import LineGraph from '../../../../components/graphs/line-graph/line-graph.component'
import {
  statisticRange,
  statisticRangeOptions
} from '../../../../enums/financials.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import FinancialsOverviewLabel from './components/financials-overview-label/financials-overview-label.component'
import { statsData } from './financials-overview.data'
import Styles from './financials-overview.styles'

type Props = {}
const FinancialsOverview = ({}: Props) => {
  const [range, setRange] = useState<string>(statisticRange.MONTH)
  const data = useMemo(() => statsData[range], [range])
  const { t } = useTranslation()
  return (
    <Styles>
      <div className={'f-overview__range'}>
        <FormSelectUI
          name={'range'}
          label={'Select Range'}
          options={statisticRangeOptions}
          value={range}
          onUpdate={setRange}
        />
      </div>
      <Card className={'f-overview__graph'}>
        <div className={'f-overview__graph__left'}>
          <h2 className={'f-overview__graph__title'}>
            {t('financials:overview.title')}
          </h2>
          <div className={'f-overview__graph__body'}>
            <LineGraph
              startDate={data.from}
              endDate={data.to}
              minValue={Math.min(...data.actual, ...data.goal)}
              maxValue={Math.max(...data.actual, ...data.goal)}
            >
              <LineGraph.Chart color={'#FF8515'} data={data.goal} />
              <LineGraph.Chart color={'#4F6CDE'} data={data.actual} />
            </LineGraph>
          </div>
        </div>
        <div className={'f-overview__graph__right'}>
          <FinancialsOverviewLabel
            label={t('financials:overview.current')}
            value={45000}
            currency={'AED'}
          />
          <FinancialsOverviewLabel
            label={t('financials:overview.goal')}
            value={55000}
            currency={'AED'}
          />
        </div>
      </Card>
    </Styles>
  )
}

export default FinancialsOverview
