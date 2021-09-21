import moment, { Moment } from 'moment'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { CaretLeftIcon } from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import useHealth from '../../../../hooks/api/progress/useHealth'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
import { DATE_FORMAT } from '../../../../utils/date'
import { OVER_TIME } from '../../progress.constants'
import AverageHighLights from '../progress-average-highlights/progress-average-highlights.component'
import DateHighLights from '../progress-date-highlights/progress-date-highlights.component'
import OverTimeDesktop from '../progress-overtime-desktop/progress-overtime-desktop.component'
import OverTimeMobile from '../progress-overtime-mobile/progress-overtime-mobile.component'
import ProgressHealthDataContext from './progress-health-data.context'
import { Wrapper } from './progress-health-data.styles'

interface Props {}

const HealthData: React.FC<Props> = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const params = useParams<any>()

  const health = useHealth({
    filter: {
      account_id: params.id
    },
    only_include: 'sleep',
    averages: true
  })

  const dateHealth = useHealth({
    filter: {
      account_id: params.id,
      date: moment().format(DATE_FORMAT)
    },
    per_page: 1
  })

  const [highlightDay, setHighlightDay] = useState<Moment>(moment())

  const highlightLabel = useMemo(() => {
    return moment().isSame(highlightDay, 'day')
      ? t('progress:todayHighlights')
      : highlightDay.format('YYYY-MM-DD') + ' Highlights'
  }, [highlightDay])

  const prevDisabled = useMemo(() => {
    return moment().diff(highlightDay, 'day') > 2
  }, [highlightDay])

  const nextDisabled = useMemo(() => {
    return moment().diff(highlightDay, 'day') <= 0
  }, [highlightDay])

  const [isGraphView, setIsGraphView] = useState(false)

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

  return (
    <ProgressHealthDataContext.Provider value={health}>
      <Wrapper>
        <div className="progress__subtitle-container">
          <h3 className="progress__subtitle">{highlightLabel}</h3>

          <div className="progress__highlight-container">
            <IconButton
              size="sm"
              disabled={prevDisabled}
              className="progress__highlight-btn"
              onClick={() => {
                const newDate = moment(highlightDay.add(-1, 'day'))
                setHighlightDay(newDate)
                dateHealth.onFilters('date', newDate.format(DATE_FORMAT))
              }}
            >
              <CaretLeftIcon />
            </IconButton>

            <IconButton
              size="sm"
              disabled={nextDisabled}
              className="progress__highlight-btn"
              onClick={() => {
                const newDate = moment(highlightDay.add(1, 'day'))
                setHighlightDay(newDate)
                dateHealth.onFilters('date', newDate.format(DATE_FORMAT))
              }}
            >
              <CaretLeftIcon />
            </IconButton>
          </div>
        </div>

        <DateHighLights date={highlightDay} data={dateHealth.health[0] || {}} />

        {isMobile ? (
          <OverTimeMobile
            filterOptions={overTimeOptions}
            graphView={isGraphView}
            setGraphView={setIsGraphView}
          />
        ) : (
          <OverTimeDesktop
            filterOptions={overTimeOptions}
            graphView={isGraphView}
            setGraphView={setIsGraphView}
          />
        )}

        <div className="progress__subtitle-container">
          <h3 className="progress__subtitle">{t('progress:average')}</h3>
        </div>

        <AverageHighLights />
      </Wrapper>
    </ProgressHealthDataContext.Provider>
  )
}

export default HealthData
