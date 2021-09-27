import React, { useContext } from 'react'

import { HeartRateV2Icon } from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import { LoadingPlaceholder } from '../../../../components/placeholders'
import { timeWithoutSeconds } from '../../../../pipes/time.pipe'
import {
  getGlucoseQuality,
  getHeartRateQuality,
  getStepsQuality
} from '../../../progress-log/log-health-data/log-health-data.helpers'
import HealthCard from '../progress-health-card/progress-health-card.component'
import ProgressHealthDataContext from '../progress-health-data/progress-health-data.context'
import { CardsWrapper } from '../progress-health-data/progress-health-data.styles'

export default function AverageHighLights() {
  const { averages, isAveragesLoading } = useContext(ProgressHealthDataContext)

  if (isAveragesLoading) {
    return <LoadingPlaceholder spacing />
  }

  return (
    <CardsWrapper>
      {averages?.avg_sleep && (
        <HealthCard
          icon={<SleepIcon />}
          data={timeWithoutSeconds(averages?.avg_sleep) + ' Hours'}
          quality="good"
          title={'Sleep Rate'}
        />
      )}
      {averages?.avg_heart_rate && (
        <HealthCard
          icon={<HeartRateV2Icon />}
          data={averages?.avg_heart_rate?.toFixed(0).toString() + ' BPM'}
          quality={getHeartRateQuality(averages.avg_heart_rate)}
          title={'Heart Rate'}
        />
      )}
      {averages?.avg_steps && (
        <HealthCard
          icon={<StepsIcon />}
          data={averages?.avg_steps?.toFixed(0).toString() + ' Steps'}
          title={'Your Steps'}
        />
      )}
      {averages?.avg_glucose && (
        <HealthCard
          icon={<BloodIcon />}
          data={averages?.avg_glucose?.toFixed(0).toString() + ' mg/dl'}
          quality={getGlucoseQuality(averages?.avg_glucose)}
          title={'Blood Glucose'}
        />
      )}
    </CardsWrapper>
  )
}
