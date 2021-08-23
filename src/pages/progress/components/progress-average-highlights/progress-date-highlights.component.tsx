import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import { getHealthDataAsync } from '../../progress.api'
import {
  HealthData as HealthDataType,
  OverTimeType
} from '../../progress.types'
import HealthCard from '../progress-health-card/progress-health-card.component'
import { CardsWrapper } from '../progress-health-data/progress-health-data.styles'

interface Props {
  range?: OverTimeType
}

const AverageHighLights: React.FC<Props> = (props) => {
  const { range } = props
  const [dateHighlights, setDateHighlights] = useState<HealthDataType>()

  const getHealthData = async () => {
    const { data } = await getHealthDataAsync({
      // date: date.format('YYYY-MM-DD')
    })

    setDateHighlights(data[0])
  }

  useEffect(() => {
    getHealthData()
  }, [])

  return (
    <CardsWrapper size="middle">
      <HealthCard
        icon={<SleepIcon />}
        data="From 22:10 to 07:00"
        quality={dateHighlights?.sleep?.quality}
      />
      <HealthCard
        icon={<CardiogramIcon />}
        data={dateHighlights?.heart_rate?.avg_rate.toString()}
        quality={dateHighlights?.heart_rate?.quality}
      />
      <HealthCard
        icon={<StepsIcon />}
        data={dateHighlights?.steps?.daily_steps.toString()}
        quality={dateHighlights?.steps?.quality}
      />
      <HealthCard
        icon={<BloodIcon />}
        data={dateHighlights?.blood_glucose?.glucose.toString()}
        quality={dateHighlights?.blood_glucose?.quality}
      />
    </CardsWrapper>
  )
}

export default AverageHighLights
