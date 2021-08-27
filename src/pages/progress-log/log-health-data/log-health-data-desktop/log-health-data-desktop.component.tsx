import { Tooltip } from 'antd'
import { useFormikContext } from 'formik'
import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as CardiogramIcon } from '../../../../assets/media/icons/heart-rate.svg'
import { ReactComponent as InfoIcon } from '../../../../assets/media/icons/info-fill.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import FormDatepicker from '../../../../components/forms/form-datepicker/form-datepicker.component'
import FormRow from '../../../../components/forms/form-row/form-row.component'
import FormSelect from '../../../../components/forms/form-select/form-select.component'
import FormTimepicker from '../../../../components/forms/form-timepicker/form-timepicker.component'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getDuration } from '../../../../pipes/duration.pipe'
import { QUALITY } from '../../../progress/progress.constants'
import { HealthData } from '../../../progress/progress.types'
import LogCardDesktop from '../components/log-card-desktop/log-card-desktop.component'
import {
  Border,
  LogName,
  LogQuality,
  Space as Spacer,
  Wrapper as SleepCardWrapper
} from '../components/log-card-desktop/log-card-desktop.styles'
import LogClient from '../components/log-client/log-client.component'
import {
  getGlucoseQuality,
  getHeartRateQuality,
  getStepsQuality
} from '../log-health-data.helpers'
import {
  CardsWrapper,
  InputsWrapper,
  PickersWrapper,
  SubmitButton,
  SubmitButtonWrapper,
  Wrapper
} from './log-health-data-desktop.styles'

const LogHealthDataDesktop: React.FC<{}> = () => {
  const { t } = useTranslation()
  const { values, isValid } = useFormikContext<HealthData>()
  const { type } = useAuth()
  const history = useHistory()
  const sleepOptions = useMemo(
    () => [
      { value: QUALITY.LOW, label: t(`progress:${QUALITY.LOW}`) },
      {
        value: QUALITY.AVERAGE,
        label: t(`progress:${QUALITY.AVERAGE}`)
      },
      { value: QUALITY.GOOD, label: t(`progress:${QUALITY.GOOD}`) }
    ],
    []
  )

  return (
    <Wrapper>
      {type === userTypes.CLIENT ? null : <LogClient />}
      <FormRow>
        <CardsWrapper>
          <SleepCardWrapper>
            <PickersWrapper size="middle">
              <FormDatepicker
                name="date"
                label={t('progress:loggingDate')}
                onUpdate={(_, value) =>
                  history.replace(Routes.PROGRESS_LOG_HEALTH_DATA + `/${value}`)
                }
              />
              <FormTimepicker name="time" label={t('progress:loggingTime')} />
            </PickersWrapper>
          </SleepCardWrapper>
          <LogCardDesktop
            name={t('progress:heart_rate')}
            inputName="heart_rate.avg_rate"
            inputLabel={`${t('progress:avg_rate')}`}
            getQuality={getHeartRateQuality}
            Icon={<CardiogramIcon />}
            max={200}
          />
          <LogCardDesktop
            name={t('progress:steps')}
            inputName="steps.daily_steps"
            inputLabel={t('progress:daily_steps')}
            getQuality={getStepsQuality}
            Icon={<StepsIcon />}
            max={1e5}
          />
          <LogCardDesktop
            name={t('progress:blood_glucose')}
            inputName="blood_glucose.glucose"
            inputLabel={t('progress:glucose')}
            getQuality={getGlucoseQuality}
            Icon={<BloodIcon />}
            max={350}
          />
          <SleepCardWrapper>
            <div>
              <LogName>
                <SleepIcon />
                <span>{t('progress:sleep')}</span>
                <Tooltip title="TBD">
                  <InfoIcon />
                </Tooltip>
                <Spacer />
                <Border />
              </LogName>
              <InputsWrapper>
                <FormRow>
                  <FormTimepicker
                    name="sleep.start_time"
                    label={t('progress:start_time')}
                  />
                  <FormTimepicker
                    name="sleep.end_time"
                    label={t('progress:end_time')}
                  />
                </FormRow>
                <FormRow>
                  <FormTimepicker
                    name="sleep.nap_start_time"
                    label={t('progress:nap_start_time')}
                  />
                  <FormTimepicker
                    name="sleep.nap_end_time"
                    label={t('progress:nap_end_time')}
                  />
                </FormRow>
                <FormSelect
                  label={t('progress:qualityLabel')}
                  name="sleep.quality"
                  options={sleepOptions}
                />
              </InputsWrapper>
              <LogQuality>
                <Border />
                <div>
                  <span>
                    <span className={'log-quality-label'}>
                      <span>{t('progress:duration')}</span>
                      <InfoIcon />
                    </span>
                    <span className={'log-quality-value'}>
                      {getDuration(
                        values.sleep?.start_time,
                        values.sleep?.end_time
                      ) || '-'}
                    </span>
                  </span>
                  <span style={{ marginTop: '44px' }}>
                    <span className={'log-quality-label'}>
                      <span>{t('progress:duration')}</span>
                      <InfoIcon />
                    </span>
                    <span className={'log-quality-value'}>
                      {getDuration(
                        values.sleep?.nap_start_time,
                        values.sleep?.nap_end_time
                      ) || '-'}
                    </span>
                  </span>
                </div>
              </LogQuality>
            </div>
          </SleepCardWrapper>
        </CardsWrapper>
        <SubmitButtonWrapper>
          <SubmitButton disabled={!isValid}>
            {t('progress:saveLogs')}
          </SubmitButton>
        </SubmitButtonWrapper>
      </FormRow>
    </Wrapper>
  )
}

export default LogHealthDataDesktop
