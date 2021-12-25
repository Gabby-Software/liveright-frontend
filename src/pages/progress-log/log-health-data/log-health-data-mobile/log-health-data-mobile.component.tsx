import { Field, FieldProps, useFormikContext } from 'formik'
import moment from 'moment'
import React, { FC, useMemo } from 'react'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'

import { HeartRateV2Icon } from '../../../../assets/media/icons'
import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import Button from '../../../../components/buttons/button/button.component'
import DatePicker from '../../../../components/form/date-picker/date-picker.component'
import Select from '../../../../components/form/select/select.component'
import TimePicker from '../../../../components/form/time-picker/time-picker.component'
import FormError from '../../../../components/forms/form-error/form-error.component'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { classes } from '../../../../pipes/classes.pipe'
import { getDuration } from '../../../../pipes/duration.pipe'
import { isOverlapBetween } from '../../../../utils/date'
import { getRoute } from '../../../../utils/routes'
import ClientInfoMobile from '../../../progress/components/client-info-mobile/client-info-mobile.component'
import { QUALITY } from '../../../progress/progress.constants'
import { HealthData } from '../../../progress/progress.types'
import {
  getGlucoseQuality,
  getHeartRateQuality
} from '../log-health-data.helpers'
import {
  CardTitle,
  FormRow,
  GrayStyledInput,
  GrayStyledTimeInput,
  Info,
  WhiteCard,
  Wrapper
} from './log-health-data-mobile.styles'

const GrayInput: FC<{
  name: string
  label: string
  time?: boolean
  max?: number
}> = ({ name, label, time }) => {
  return (
    <div>
      <div className={'log-health__label'}>{label}</div>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const meta = form.getFieldMeta(name)
          return time ? (
            <GrayStyledTimeInput
              value={field.value ? moment(field.value, 'H:mm') : null}
              className={classes(
                'text_input__input',
                meta.error && meta.touched && 'text_input__error'
              )}
              onChange={(date, dateString: string) => {
                form.setFieldValue(name, dateString)
              }}
              placeholder={''}
              suffixIcon={<div />}
              format={'H:mm'}
              onBlur={field.onBlur}
            />
          ) : (
            <GrayStyledInput
              {...field}
              onChange={(e: any) => {
                const val = +e.target.value.replace(/\D/g, '')
                form.setFieldValue(name, val)
              }}
            />
          )
        }}
      </Field>
      <FormError name={name} />
    </div>
  )
}

const LogHealthValue: FC<{
  name: string
  getQuality: (val: number) => string
}> = ({ name, getQuality }) => {
  const { getFieldMeta } = useFormikContext<HealthData>()

  const value = getFieldMeta<number>(name)
  const quality = getQuality(value.value)

  const { t } = useTranslation()
  return (
    <div className={'log-health__value__cont'}>
      <div className={'log-health__label'}>{t('progress:qualityLabel')}</div>
      <div className={'log-health__value'}>
        {quality ? t(`progress:${quality}`) : '-'}
      </div>
    </div>
  )
}

const LogHealthDataMobile = () => {
  const { t } = useTranslation()
  const { type } = useAuth()
  const history = useHistory()
  const params = useParams<any>()
  const { getFieldMeta, values, setFieldValue } = useFormikContext<HealthData>()

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

  const sleepTime = getDuration(
    getFieldMeta<string>('sleep.start_time').value,
    getFieldMeta<string>('sleep.end_time').value
  )

  const nupTime = getDuration(
    getFieldMeta<string>('sleep.nap_start_time').value,
    getFieldMeta<string>('sleep.nap_end_time').value
  )

  const replaceUrl = (date: string) =>
    type === userTypes.CLIENT
      ? getRoute(Routes.PROGRESS_CLIENT_LOG_HEALTH_DATA, { date })
      : getRoute(Routes.PROGRESS_LOG_HEALTH_DATA, {
          clientId: params.clientId,
          date
        })

  const overlap = values.sleep
    ? isOverlapBetween(
        values.sleep?.start_time,
        values.sleep?.end_time,
        values.sleep?.nap_start_time,
        values.sleep?.nap_end_time
      )
    : false

  return (
    <Wrapper>
      {type !== userTypes.CLIENT ? <ClientInfoMobile /> : null}

      <WhiteCard>
        <DatePicker
          id="log-date"
          name="date"
          value={values.date}
          onChange={(e, date) => {
            setFieldValue('date', date)
            history.replace(replaceUrl(date))
          }}
          label={t('progress:loggingDate')}
          className="log-health__form-item"
          disabledFuture
        />
        <TimePicker
          id="log-time"
          name="time"
          value={values.time}
          onChange={(e, date) => setFieldValue('time', date)}
          label={t('progress:loggingTime')}
        />
      </WhiteCard>

      <WhiteCard>
        <CardTitle>
          <HeartRateV2Icon />
          <span>{t('progress:heart_rate')}</span>
          <Info />
        </CardTitle>

        <FormRow>
          <GrayInput
            name={'heart_rate.avg_rate'}
            label={t('progress:avg_rate')}
            max={200}
          />
          <LogHealthValue
            name={'heart_rate.avg_rate'}
            getQuality={getHeartRateQuality}
          />
        </FormRow>
      </WhiteCard>

      <WhiteCard>
        <CardTitle>
          <StepsIcon />
          <span>{t('progress:steps')}</span>
          <Info />
        </CardTitle>
        <FormRow>
          <GrayInput
            name={'steps.daily_steps'}
            label={t('progress:daily_steps')}
            max={1e5}
          />
          {/*<LogHealthValue*/}
          {/*  name={'steps.daily_steps'}*/}
          {/*  getQuality={getStepsQuality}*/}
          {/*/>*/}
        </FormRow>
      </WhiteCard>

      <WhiteCard>
        <CardTitle>
          <BloodIcon />
          <span>{t('progress:blood_glucose')}</span>
          <Info />
        </CardTitle>
        <FormRow>
          <GrayInput
            name={'blood_glucose.glucose'}
            label={t('progress:glucose')}
            max={350}
          />
          <LogHealthValue
            name={'blood_glucose.glucose'}
            getQuality={getGlucoseQuality}
          />
        </FormRow>
      </WhiteCard>

      <WhiteCard>
        <CardTitle>
          <SleepIcon />
          <span>{t('progress:sleep')}</span>
          <Info />
        </CardTitle>
        <FormRow>
          <GrayInput
            name={'sleep.start_time'}
            label={t('progress:start_time')}
            time
          />
          <div className={'log-health__result'}>
            {values.sleep?.start_time && values.sleep?.end_time && (
              <span>{sleepTime}</span>
            )}
          </div>
          <GrayInput
            name={'sleep.end_time'}
            label={t('progress:end_time')}
            time
          />
        </FormRow>
        <FormRow>
          <GrayInput
            name={'sleep.nap_start_time'}
            label={t('progress:nap_start_time')}
            time
          />
          <div className={'log-health__result'}>
            {values.sleep?.nap_start_time && values.sleep?.nap_end_time && (
              <span>{nupTime}</span>
            )}
          </div>
          <GrayInput
            name={'sleep.nap_end_time'}
            label={t('progress:nap_end_time')}
            time
          />
        </FormRow>

        {overlap && (
          <p className="log-health__error">Sleep and nap should not overlap</p>
        )}

        <Select
          id="log-quality"
          label={t('progress:qualityLabel')}
          name={'sleep.quality'}
          options={sleepOptions}
          value={values.sleep?.quality}
          onChange={(e) => setFieldValue('sleep.quality', e)}
        />
      </WhiteCard>

      <Button htmlType="submit" className="log-health__submit">
        Save Logs
      </Button>
    </Wrapper>
  )
}

export default LogHealthDataMobile
