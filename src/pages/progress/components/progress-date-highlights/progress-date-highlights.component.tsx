import { HeartRateV2Icon } from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { timeWithoutSeconds } from '../../../../pipes/time.pipe'
import { HealthData } from '../../progress.types'
import HealthCard from '../progress-health-card/progress-health-card.component'
import { CardsWrapper } from '../progress-health-data/progress-health-data.styles'

interface Props {
  date?: string
  data: HealthData
}

export default function DateHighLights({ date, data }: Props) {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const sleepData = getSleepData(data, isMobile, t)

  return (
    <CardsWrapper>
      <HealthCard
        date={date}
        icon={<SleepIcon />}
        data={sleepData}
        quality={data?.sleep?.quality}
        title={'Sleep Rate'}
      />
      <HealthCard
        date={date}
        icon={<HeartRateV2Icon />}
        data={
          data?.heart_rate?.avg_rate ? data?.heart_rate?.avg_rate + ' BPM' : ''
        }
        quality={data?.heart_rate?.quality}
        title={'Heart Rate'}
      />
      <HealthCard
        date={date}
        icon={<StepsIcon />}
        data={
          data?.steps?.daily_steps ? data?.steps?.daily_steps + ' Steps' : ''
        }
        // quality={data?.steps?.quality}
        title={'Your Steps'}
      />
      <HealthCard
        date={date}
        icon={<BloodIcon />}
        data={
          data?.blood_glucose?.glucose
            ? data?.blood_glucose?.glucose + ' mg/dl'
            : ''
        }
        quality={data?.blood_glucose?.quality}
        title={'Blood Glucose'}
      />
    </CardsWrapper>
  )
}

function getSleepData(data: HealthData, isMobile: boolean, t: any): string {
  if (data?.sleep) {
    const { start_time, end_time } = data.sleep

    if (!start_time || !end_time) return ''

    const start = timeWithoutSeconds(start_time)
    const end = timeWithoutSeconds(end_time)

    return `${isMobile ? '' : t('from')} ${start} ${t('to')} ${end}`
  } else {
    return ''
  }
}
