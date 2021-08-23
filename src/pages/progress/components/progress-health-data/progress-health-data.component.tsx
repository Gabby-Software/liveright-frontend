import { Moment } from 'moment'
import React, { useEffect, useMemo, useState } from 'react'

import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import { useAuth } from '../../../../hooks/auth.hook'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
import { PaginationMetaType } from '../../../../types/pagination-meta.type'
import { getHealthDataAsync } from '../../progress.api'
import { OVER_TIME, PROGRESS_LOG } from '../../progress.constants'
import {
  GetHealthDataPayload,
  HealthData as HealthDataType,
  OverTimeType,
  ProgressLogType
} from '../../progress.types'
import AverageHighLights from '../progress-average-highlights/progress-average-highlights.component'
import DateHighLights from '../progress-date-highlights/progress-date-highlights.component'
import HealthCard from '../progress-health-card/progress-health-card.component'
import OverTimeDesktop from '../progress-overtime-desktop/progress-overtime-desktop.component'
import OverTimeMobile from '../progress-overtime-mobile/progress-overtime-mobile.component'
import { CardsWrapper, Wrapper } from './progress-health-data.styles'

interface Props {}

const HealthData: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [rangeHighlights, setRangeHighlights] = useState<HealthDataType[]>([])
  const [activeTab, setActiveTab] = useState<ProgressLogType>(
    PROGRESS_LOG.SLEEP
  )
  const [isGraphView, setIsGraphView] = useState(false)
  const [specificDates, setSpecificDates] = useState({
    from_date: '',
    to_date: ''
  })
  const [overTime, setOverTime] = useState<OverTimeType>(OVER_TIME.MONTH)
  const overTimeOptions = useMemo<OptionType[]>(
    () => [
      { label: t(`progress:${OVER_TIME.WEEK}`), value: OVER_TIME.WEEK },
      { label: t(`progress:${OVER_TIME.MONTH}`), value: OVER_TIME.MONTH },
      { label: t(`progress:${OVER_TIME.QUARTER}`), value: OVER_TIME.QUARTER },
      { label: t(`progress:${OVER_TIME.YTD}`), value: OVER_TIME.YTD },
      {
        label: t(`progress:${OVER_TIME.LAST_YEAR}`),
        value: OVER_TIME.LAST_YEAR
      },
      { label: t(`progress:${OVER_TIME.SPECIFIC}`), value: OVER_TIME.SPECIFIC }
    ],
    []
  )

  const getHealthData = async () => {
    const payload: GetHealthDataPayload = { only_include: activeTab }

    if (overTime === OVER_TIME.SPECIFIC) {
      payload.from_date = specificDates.from_date
      payload.to_date = specificDates.to_date
    } else {
      payload.range = overTime
    }

    const { data = [] } = await getHealthDataAsync(payload)

    setRangeHighlights(data)
  }

  const handleSpecificDateChange = (name: string, date: string) => {
    if (date) {
      setSpecificDates({ ...specificDates, [name]: date })
    }
  }

  useEffect(() => {
    if (
      overTime !== OVER_TIME.SPECIFIC ||
      (specificDates.from_date && specificDates.to_date)
    ) {
      getHealthData()
    }
  }, [activeTab, overTime, specificDates])

  return (
    <Wrapper>
      <PageSubtitle>{t('progress:todayHighlights')}</PageSubtitle>
      <DateHighLights />

      {isMobile ? (
        <OverTimeMobile
          filter={overTime}
          setFilter={setOverTime}
          filterOptions={overTimeOptions}
          graphView={isGraphView}
          setGraphView={setIsGraphView}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          data={rangeHighlights}
          onSpecificDateChange={handleSpecificDateChange}
          specificDates={specificDates}
        />
      ) : (
        <OverTimeDesktop
          filter={overTime}
          setFilter={setOverTime}
          filterOptions={overTimeOptions}
          graphView={isGraphView}
          setGraphView={setIsGraphView}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          data={rangeHighlights}
          onSpecificDateChange={handleSpecificDateChange}
          specificDates={specificDates}
        />
      )}

      <PageSubtitle>{t('progress:average')}</PageSubtitle>
      <AverageHighLights />
    </Wrapper>
  )
}

export default HealthData
