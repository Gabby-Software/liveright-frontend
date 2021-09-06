import moment, { Moment } from 'moment'
import React, { useEffect, useMemo, useState } from 'react'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { timeWithoutSeconds } from '../../../../pipes/time.pipe'
import { getHealthDataAsync } from '../../progress.api'
import { HealthData as HealthDataType } from '../../progress.types'
import HealthCard from '../progress-health-card/progress-health-card.component'
import { CardsWrapper } from '../progress-health-data/progress-health-data.styles'

interface Props {
  date?: Moment
}

const DateHighLights: React.FC<Props> = (props) => {
  const { date = moment() } = props
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [dateHighlights, setDateHighlights] = useState<HealthDataType>()
  const sleepData = useMemo(() => {
    if (dateHighlights?.sleep) {
      const { start_time, end_time } = dateHighlights.sleep
      const start = timeWithoutSeconds(start_time)
      const end = timeWithoutSeconds(end_time)
      return `${isMobile ? '' : t('from')} ${start} ${t('to')} ${end}`
    } else {
      return ''
    }
  }, [dateHighlights, isMobile])

  useEffect(() => {
    const getHealthData = async () => {
      const { data } = await getHealthDataAsync({
        date: date.format('YYYY-MM-DD')
      })

      setDateHighlights(data[0])
    }

    getHealthData()
  }, [])

  return (
    <CardsWrapper>
      <HealthCard
        date={date}
        icon={<SleepIcon />}
        data={sleepData}
        quality={dateHighlights?.sleep?.quality}
        title={'Sleep Rate'}
      />
      <HealthCard
        date={date}
        icon={<CardiogramIcon />}
        data={
          dateHighlights?.heart_rate?.avg_rate
            ? dateHighlights?.heart_rate?.avg_rate + ' BPM'
            : ''
        }
        quality={dateHighlights?.heart_rate?.quality}
        title={'Heart Rate'}
      />
      <HealthCard
        date={date}
        icon={<StepsIcon />}
        data={
          dateHighlights?.steps?.daily_steps
            ? dateHighlights?.steps?.daily_steps + ' Steps'
            : ''
        }
        quality={dateHighlights?.steps?.quality}
        title={'Your Steps'}
      />
      <HealthCard
        date={date}
        icon={<BloodIcon />}
        data={
          dateHighlights?.blood_glucose?.glucose
            ? dateHighlights?.blood_glucose?.glucose + ' mg/dl'
            : ''
        }
        quality={dateHighlights?.blood_glucose?.quality}
        title={'Blood Glucose'}
      />
    </CardsWrapper>
  )
}

export default DateHighLights
