import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import { getHealthDataAsync } from '../../progress.api'
import { HealthData as HealthDataType } from '../../progress.types'
import HealthCard from '../progress-health-card/progress-health-card.component'
import { CardsWrapper } from '../progress-health-data/progress-health-data.styles'

interface Props {
  date?: Moment
}

const DateHighLights: React.FC<Props> = (props) => {
  const { date = moment() } = props
  const [dateHighlights, setDateHighlights] = useState<HealthDataType>()

  useEffect(() => {
    const getHealthData = async () => {
      const { data } = await getHealthDataAsync({
        date: date.format('YYYY-MM-DD')
      })

      setDateHighlights(data[3]) // Temp
    }

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

export default DateHighLights
