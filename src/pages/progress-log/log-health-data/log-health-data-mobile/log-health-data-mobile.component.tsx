import { Field, FieldProps, useFormikContext } from 'formik'
import moment from 'moment'
import React, { FC, useMemo } from 'react'

import { ReactComponent as BloodIcon } from '../../../../assets/media/icons/blood.svg'
import { ReactComponent as HeartRateIcon } from '../../../../assets/media/icons/heart-rate.svg'
import { ReactComponent as SleepIcon } from '../../../../assets/media/icons/sleep.svg'
import { ReactComponent as StepsIcon } from '../../../../assets/media/icons/steps.svg'
import ButtonSubmit from '../../../../components/forms/button-submit/button-submit.component'
import FormDatepicker from '../../../../components/forms/form-datepicker/form-datepicker.component'
import FormSelect from '../../../../components/forms/form-select/form-select.component'
import FormTimepicker from '../../../../components/forms/form-timepicker/form-timepicker.component'
import logger from '../../../../managers/logger.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { classes } from '../../../../pipes/classes.pipe'
import { getDuration } from '../../../../pipes/duration.pipe'
import { QUALITY } from '../../../progress/progress.constants'
import { HealthData } from '../../../progress/progress.types'
import {
  getGlucoseQuality,
  getHeartRateQuality,
  getStepsQuality
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
}> = ({ name, label, time, max }) => {
  return (
    <div>
      <div className={'log-health__label'}>{label}</div>
      <Field name={name}>
        {({ field, form }: FieldProps) =>
          time ? (
            <GrayStyledTimeInput
              value={field.value ? moment(field.value, 'H:mm') : null}
              className={classes(
                'text_input__input',
                form.errors[name] && form.touched[name] && 'text_input__error'
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
              onChange={(e) => {
                const val = +e.target.value.replace(/\D/g, '')
                form.setFieldValue(name, Math.min(val, max || Infinity))
              }}
            />
          )
        }
      </Field>
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
  const { getFieldMeta, isValid } = useFormikContext<HealthData>()
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
  logger.info(
    getFieldMeta<string>('sleep.nap_start_time').value,
    getFieldMeta<string>('sleep.nap_end_time').value
  )
  return (
    <Wrapper>
      <WhiteCard>
        <FormDatepicker name="date" label={t('progress:loggingDate')} />
        <FormTimepicker name="time" label={t('progress:loggingTime')} />
      </WhiteCard>
      <WhiteCard>
        <CardTitle>
          <HeartRateIcon />
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
          <LogHealthValue
            name={'steps.daily_steps'}
            getQuality={getStepsQuality}
          />
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
            <span>{sleepTime}</span>
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
            <span>{nupTime}</span>
          </div>
          <GrayInput
            name={'sleep.nap_end_time'}
            label={t('progress:nap_end_time')}
            time
          />
        </FormRow>
        <FormSelect
          label={t('progress:qualityLabel')}
          name={'sleep.quality'}
          options={sleepOptions}
        />
      </WhiteCard>
      <ButtonSubmit disabled={!isValid}>Save Logs</ButtonSubmit>
    </Wrapper>
  )
}

export default LogHealthDataMobile
