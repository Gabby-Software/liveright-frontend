import { Tooltip } from 'antd'
import { useFormikContext } from 'formik'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

import { HeartRateV2Icon } from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as InfoIcon } from '../../../../assets/media/icons/info-fill.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Select from '../../../../components/form/select/select.component'
import TimePicker from '../../../../components/form/time-picker/time-picker.component'
import MobileBack from '../../../../components/mobile-back/mobile-back.component'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { getDuration } from '../../../../pipes/duration.pipe'
import { getRoute } from '../../../../utils/routes'
import SwitchClient from '../../../progress/components/switch-client/switch-client.component'
import { QUALITY } from '../../../progress/progress.constants'
import { HealthData } from '../../../progress/progress.types'
import LogCardDesktop from '../components/log-card-desktop/log-card-desktop.component'
import {
  LogName,
  LogQuality,
  Wrapper as CardWrapper
} from '../components/log-card-desktop/log-card-desktop.styles'
import LogClient from '../components/log-client/log-client.component'
import SubmitButtonDesktop from '../components/submit-button-desktop/submit-button-desktop.component'
import {
  getGlucoseQuality,
  getHeartRateQuality
} from '../log-health-data.helpers'
import {
  CardsWrapper,
  InputsWrapper,
  LogCard,
  Wrapper
} from './log-health-data-desktop.styles'

const LogHealthDataDesktop: React.FC = () => {
  const { t } = useTranslation()
  const [switchDialog, setSwitchDialog] = useState(false)
  const { values, setFieldValue } = useFormikContext<HealthData>()
  const { type } = useAuth()
  const history = useHistory()
  const params = useParams<any>()
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

  const backUrl =
    type === userTypes.CLIENT
      ? Routes.PROGRESS_CLIENT_HEALTH_DATA
      : getRoute(Routes.PROGRESS_HEALTH_DATA, { id: params.id })

  const replaceUrl = (date: string) =>
    type === userTypes.CLIENT
      ? getRoute(Routes.PROGRESS_CLIENT_LOG_HEALTH_DATA, { date })
      : getRoute(Routes.PROGRESS_LOG_HEALTH_DATA, {
          id: params.id,
          date
        })

  return (
    <>
      <Wrapper>
        <MobileBack alias="health-data" to={backUrl} />

        <h2 className="log-health__title">Log Health Data</h2>

        {type !== userTypes.CLIENT && (
          <LogClient onSwitch={() => setSwitchDialog(true)} />
        )}

        <div className="log-health__container">
          <CardsWrapper>
            <LogCard>
              <DatePicker
                id="log-date"
                name="date"
                value={values.date}
                label={t('progress:loggingDate')}
                onChange={(e, date) => {
                  setFieldValue('date', date)
                  history.replace(replaceUrl(date))
                }}
              />
              <TimePicker
                id="log-time"
                name="time"
                value={values.time}
                label={t('progress:loggingTime')}
                onChange={(e, date) => {
                  setFieldValue('time', date)
                }}
              />
            </LogCard>

            <LogCardDesktop
              name={t('progress:heart_rate')}
              inputName="heart_rate.avg_rate"
              inputLabel={`${t('progress:avg_rate')}`}
              getQuality={getHeartRateQuality}
              Icon={<HeartRateV2Icon />}
              max={200}
            />
            <LogCardDesktop
              name={t('progress:steps')}
              inputName="steps.daily_steps"
              inputLabel={t('progress:daily_steps')}
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

            <CardWrapper>
              <LogName>
                <SleepIcon />
                <span>{t('progress:sleep')}</span>
                <Tooltip title="TBD">
                  <InfoIcon />
                </Tooltip>
              </LogName>

              <InputsWrapper>
                <div className="log-health__sleep-controls">
                  <TimePicker
                    id="log-health-sleep-start"
                    name="sleep.start_time"
                    label={t('progress:start_time')}
                    value={values.sleep?.start_time}
                    onChange={(e, date) =>
                      setFieldValue('sleep.start_time', date)
                    }
                  />
                  <TimePicker
                    id="log-health-sleep-end"
                    name="sleep.end_time"
                    label={t('progress:end_time')}
                    value={values.sleep?.end_time}
                    onChange={(e, date) =>
                      setFieldValue('sleep.end_time', date)
                    }
                  />
                  <TimePicker
                    id="log-health-nap-start"
                    name="sleep.nap_start_time"
                    label={t('progress:nap_start_time')}
                    value={values.sleep?.nap_start_time}
                    onChange={(e, date) =>
                      setFieldValue('sleep.nap_start_time', date)
                    }
                  />
                  <TimePicker
                    id="log-health-nap-end"
                    name="sleep.nap_end_time"
                    label={t('progress:nap_end_time')}
                    value={values.sleep?.nap_end_time}
                    onChange={(e, date) =>
                      setFieldValue('sleep.nap_end_time', date)
                    }
                  />
                </div>

                <Select
                  id="log-health-quality"
                  label={t('progress:qualityLabel')}
                  name="sleep.quality"
                  value={values.sleep?.quality}
                  onChange={(e) => setFieldValue('sleep.quality', e)}
                  options={sleepOptions}
                />
              </InputsWrapper>

              <LogQuality>
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
            </CardWrapper>
          </CardsWrapper>

          <SubmitButtonDesktop />
        </div>
      </Wrapper>

      <SwitchClient
        open={switchDialog}
        onClose={() => setSwitchDialog(false)}
      />
    </>
  )
}

export default LogHealthDataDesktop
