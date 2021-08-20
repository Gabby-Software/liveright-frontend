import { Space, Tooltip } from 'antd'
import { useFormikContext } from 'formik'
import React, { useMemo } from 'react'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/cardiogram.svg'
import { ReactComponent as InfoIcon } from '../../../../assets/media/icons/info.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import FormDatepicker from '../../../../components/forms/form-datepicker/form-datepicker.component'
import FormSelect from '../../../../components/forms/form-select/form-select.component'
import FormTimepicker from '../../../../components/forms/form-timepicker/form-timepicker.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getDuration } from '../../../../pipes/duration.pipe'
import { QUALITY } from '../../../progress/progress.constants'
import { HealthData } from '../../../progress/progress.types'
import LogCardDesktop from '../components/log-card-desktop/log-card-desktop.component'
import {
  LogName,
  LogQuality,
  Wrapper as SleepCardWrapper,
} from '../components/log-card-desktop/log-card-desktop.styles'
import {
  getGlucoseQuality,
  getHeartRateQuality,
  getStepsQuality,
} from '../log-health-data.helpers'
import {
  CardsWrapper,
  InputsWrapper,
  PickersWrapper,
  SubmitButton,
  SubmitButtonWrapper,
  Wrapper,
} from './log-health-data-desktop.styles'

const LogHealthDataDesktop = () => {
  const { t } = useTranslation()
  const { values } = useFormikContext<HealthData>()
  const sleepOptions = useMemo(
    () => [
      { value: QUALITY.LOW, label: t(`progress:quality.${QUALITY.LOW}`) },
      {
        value: QUALITY.AVERAGE,
        label: t(`progress:quality.${QUALITY.AVERAGE}`),
      },
      { value: QUALITY.GOOD, label: t(`progress:quality.${QUALITY.GOOD}`) },
      { value: QUALITY.HIGH, label: t(`progress:quality.${QUALITY.HIGH}`) },
    ],
    [],
  )

  return (
    <Wrapper>
      <PickersWrapper size="middle">
        <FormDatepicker name="date" label={t('progress:loggingDate')} />
        <FormTimepicker name="time" label={t('progress:loggingTime')} />
      </PickersWrapper>
      <CardsWrapper>
        <LogCardDesktop
          name={t('progress:heartRate')}
          inputName="heart_rate.avg_rate"
          inputLabel={`${t('progress:average')} ${t('progress:heartRate')}`}
          getQuality={getHeartRateQuality}
          Icon={<CardiogramIcon />}
        />
        <LogCardDesktop
          name={t('progress:steps')}
          inputName="steps.daily_steps"
          inputLabel={t('progress:dailySteps')}
          getQuality={getStepsQuality}
          Icon={<StepsIcon />}
        />
        <LogCardDesktop
          name={t('progress:bloodGlicose')}
          inputName="blood_glucose.glucose"
          inputLabel={t('progress:glicose')}
          getQuality={getGlucoseQuality}
          Icon={<BloodIcon />}
        />
        <SleepCardWrapper>
          <div>
            <LogName>
              <SleepIcon />
              <span>{t('progress:sleep')}</span>
              <Tooltip title="TBD">
                <InfoIcon />
              </Tooltip>
            </LogName>
            <InputsWrapper>
              <Space>
                <FormTimepicker
                  name="sleep.start_time"
                  label={t('progress:startTime')}
                />
                <FormTimepicker
                  name="sleep.end_time"
                  label={t('progress:endTime')}
                />
                <LogQuality>
                  <span>{t('progress:duration')}</span>
                  <span>
                    {getDuration(
                      values.sleep?.start_time,
                      values.sleep?.end_time,
                    ) || '-'}
                  </span>
                </LogQuality>
              </Space>
              <Space>
                <FormTimepicker
                  name="sleep.nap_start_time"
                  label={t('progress:napStarts')}
                />
                <FormTimepicker
                  name="sleep.nap_end_time"
                  label={t('progress:napEnds')}
                />
                <LogQuality>
                  <span>{t('progress:duration')}</span>
                  <span>
                    {getDuration(
                      values.sleep?.nap_start_time,
                      values.sleep?.nap_end_time,
                    ) || '-'}
                  </span>
                </LogQuality>
              </Space>
              <FormSelect
                label={t('progress:qualityLabel')}
                name="sleep.quality"
                options={sleepOptions}
              />
            </InputsWrapper>
          </div>
        </SleepCardWrapper>
        <SubmitButtonWrapper>
          <SubmitButton>{t('progress:saveLogs')}</SubmitButton>
        </SubmitButtonWrapper>
      </CardsWrapper>
    </Wrapper>
  )
}

export default LogHealthDataDesktop
