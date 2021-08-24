import React, { useEffect, useState } from 'react'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
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

const AverageHighLights: React.FC<Props> = (props) => {
  const { range } = props
  const { t } = useTranslation()
  const [highlights, setHighlights] = useState<AverageHealthData>()

  const getHealthData = async () => {
    const { data } = await getAverageHealthDataAsync()

    setHighlights(data)
  }

  useEffect(() => {
    getHealthData()
  }, [])

  return (
    <CardsWrapper size="middle">
      {highlights?.avg_sleep ? (
        <HealthCard
          icon={<SleepIcon />}
          data={timeWithoutSeconds(highlights?.avg_sleep)}
          quality="good"
        />
      ) : null}
      {highlights?.avg_heart_rate ? (
        <HealthCard
          icon={<CardiogramIcon />}
          data={highlights?.avg_heart_rate?.toFixed(0).toString()}
          quality={getHeartRateQuality(highlights?.avg_heart_rate)}
        />
      ) : null}
      {highlights?.avg_steps ? (
        <HealthCard
          icon={<StepsIcon />}
          data={highlights?.avg_steps?.toFixed(0).toString()}
          quality={getStepsQuality(highlights?.avg_steps)}
        />
      ) : null}
      {highlights?.avg_glucose ? (
        <HealthCard
          icon={<BloodIcon />}
          data={highlights?.avg_glucose?.toFixed(0).toString()}
          quality={getGlucoseQuality(highlights?.avg_glucose)}
        />
      ) : null}
    </CardsWrapper>
  )
}

export default AverageHighLights