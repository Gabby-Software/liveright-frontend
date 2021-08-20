import React from 'react'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import FormDatepicker from '../../../../components/forms/form-datepicker/form-datepicker.component'
import FormTimepicker from '../../../../components/forms/form-timepicker/form-timepicker.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import LogCardDesktop from '../components/log-card-desktop/log-card-desktop.component'
import { PickersWrapper, Wrapper } from './log-health-data-desktop.styles'

const LogHealthDataDesktop = () => {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <PickersWrapper size="middle">
        <FormDatepicker name="date" label={t('progress:loggingDate')} />
        <FormTimepicker name="time" label={t('progress:loggingTime')} />
      </PickersWrapper>
      <LogCardDesktop
        name={t('progress:heartRate')}
        inputName="heart_rate.avg_rate"
        inputLabel={`${t('progress:average')} ${t('progress:heartRate')}`}
        quality="low"
        Icon={<CardiogramIcon />}
      />
      <LogCardDesktop
        name={t('progress:steps')}
        inputName="steps.daily_steps"
        inputLabel={t('progress:dailySteps')}
        quality="average"
        Icon={<StepsIcon />}
      />
      <LogCardDesktop
        name={t('progress:bloodGlicose')}
        inputName="blood_glicose.glucose"
        inputLabel={t('progress:glicose')}
        quality="high"
        Icon={<BloodIcon />}
      />
    </Wrapper>
  )
}

export default LogHealthDataDesktop
