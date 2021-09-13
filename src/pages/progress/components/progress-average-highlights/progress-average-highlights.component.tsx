import React, { useEffect, useState } from 'react'

import { HeartRateV2Icon } from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import { timeWithoutSeconds } from '../../../../pipes/time.pipe'
import {
  getGlucoseQuality,
  getHeartRateQuality,
  getStepsQuality
} from '../../../progress-log/log-health-data/log-health-data.helpers'
import { getAverageHealthDataAsync } from '../../progress.api'
import { AverageHealthData, OverTimeType } from '../../progress.types'
import HealthCard from '../progress-health-card/progress-health-card.component'
import { CardsWrapper } from '../progress-health-data/progress-health-data.styles'

interface Props {
  range?: OverTimeType
}

const AverageHighLights: React.FC<Props> = () => {
  const [highlights, setHighlights] = useState<AverageHealthData>()

  const getHealthData = async () => {
    const { data } = await getAverageHealthDataAsync()

    setHighlights(data)
  }

  useEffect(() => {
    getHealthData()
  }, [])

  return (
    <CardsWrapper>
      {highlights?.avg_sleep ? (
        <HealthCard
          icon={<SleepIcon />}
          data={timeWithoutSeconds(highlights?.avg_sleep) + ' Hours'}
          quality="good"
          title={'Sleep Rate'}
        />
      ) : null}
      {highlights?.avg_heart_rate ? (
        <HealthCard
          icon={<HeartRateV2Icon />}
          data={highlights?.avg_heart_rate?.toFixed(0).toString() + ' BPM'}
          quality={getHeartRateQuality(highlights?.avg_heart_rate)}
          title={'Heart Rate'}
        />
      ) : null}
      {highlights?.avg_steps ? (
        <HealthCard
          icon={<StepsIcon />}
          data={highlights?.avg_steps?.toFixed(0).toString() + ' Steps'}
          quality={getStepsQuality(highlights?.avg_steps)}
          title={'Your Steps'}
        />
      ) : null}
      {highlights?.avg_glucose ? (
        <HealthCard
          icon={<BloodIcon />}
          data={highlights?.avg_glucose?.toFixed(0).toString() + ' mg/dl'}
          quality={getGlucoseQuality(highlights?.avg_glucose)}
          title={'Blood Glucose'}
        />
      ) : null}
    </CardsWrapper>
  )
}

export default AverageHighLights
