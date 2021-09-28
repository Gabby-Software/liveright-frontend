import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { CaretLeftIcon } from '../../../../assets/media/icons'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import { LoadingPlaceholder } from '../../../../components/placeholders'
import useHealth from '../../../../hooks/api/progress/useHealth'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { OptionType } from '../../../../types/option.type'
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
  const [previewIndex, setPreviewIndex] = useState(0)

  const health = useHealth({
    filter: {
      account_id: params.id
    },
    only_include: 'sleep',
    averages: true
  })

  const healthAll = useHealth({
    filter: {
      account_id: params.id
    },
    sort: {
      date: 'asc'
    }
  })

  const count = healthAll.health.length

  useEffect(() => {
    if (count) {
      setPreviewIndex(count - 1)
    }
  }, [count])

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

  const prevDisabled = !(
    previewIndex - 1 >= 0 && !!healthAll.health[previewIndex - 1]
  )
  const nextDisabled = !healthAll.health[previewIndex + 1]

  return (
    <ProgressHealthDataContext.Provider value={health}>
      <Wrapper>
        {healthAll.isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <>
            <div className="progress__subtitle-container">
              <h3 className="progress__subtitle">
                {healthAll.health[previewIndex]?.date + ' Highlight'}
              </h3>

              <div className="progress__highlight-container">
                <IconButton
                  size="sm"
                  disabled={prevDisabled}
                  className="progress__highlight-btn"
                  onClick={() => setPreviewIndex(previewIndex - 1)}
                >
                  <CaretLeftIcon />
                </IconButton>

                <IconButton
                  size="sm"
                  disabled={nextDisabled}
                  className="progress__highlight-btn"
                  onClick={() => setPreviewIndex(previewIndex + 1)}
                >
                  <CaretLeftIcon />
                </IconButton>
              </div>
            </div>

            <DateHighLights
              date={healthAll.health[previewIndex].date}
              data={healthAll.health[previewIndex] || {}}
            />
          </>
        )}

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
