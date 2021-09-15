import { FormikHelpers, useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'

import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import { useIsBusy } from '../../../../../hooks/sessions.hook'
import { useChats } from '../../../../../modules/chat/contexts/chats.context'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { ACTION_CLIENT_RESCHEDULE_SESSION_REQUEST } from '../../../../../store/action-types'
import { SessionType } from '../../../../../types/session.type'
import Button from '../../../../buttons/button/button.component'
import Card from '../../../../cards/card/card.component'
import CurrentDateCard from '../../../../cards/current-date-card/current-date-card.component'
import DatePicker from '../../../../form/date-picker/date-picker.component'
import TimePicker from '../../../../form/time-picker/time-picker.component'
import Styles from './form.styles'

type RescheduleFormType = {
  date: string
  time: string
  duration: string
}

interface FormProps {
  session: SessionType
  onSuccess?: () => void
  mutate?: any
}

export default function Form({ session, onSuccess, mutate }: FormProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isMobile = useIsMobile()
  const { sendSessionReschedule } = useChats()

  const handleSubmit = (
    values: RescheduleFormType,
    helper: FormikHelpers<RescheduleFormType>
  ) => {
    const { date, duration, time } = values

    dispatch({
      type: ACTION_CLIENT_RESCHEDULE_SESSION_REQUEST,
      payload: {
        id: session.id,
        date,
        duration: moment(duration, 'HH:mm').format('HH:mm:ss'),
        time: moment(time, 'HH:mm').format('HH:mm:ss'),
        onSuccess: () => {
          mutate?.()
          sendSessionReschedule({
            session_id: String(session.id),
            requested_time:
              date + ' ' + moment(time, 'h:mm').format('HH:mm:ss'),
            current_time: session.starts_at
          })
        }
      }
    })

    helper.setSubmitting(false)
    onSuccess?.()
  }

  const { values, submitForm, setFieldValue, setValues, errors, touched } =
    useFormik({
      initialValues: {
        date: '',
        time: '',
        duration: ''
      },
      validationSchema: Yup.object({
        date: Yup.date().min(moment().startOf('day')).required(),
        time: Yup.string().required()
      }),
      onSubmit: handleSubmit
    })

  useEffect(() => {
    setValues({
      date: moment(session.starts_at).format('YYYY-MM-DD'),
      time: moment.utc(session.starts_at).format('HH:mm'),
      duration: moment(session.duration, 'HH:mm:ss').format('HH:mm')
    })
  }, [session.starts_at, session.duration])

  const { date, time } = values

  const isBusy = useIsBusy({
    date,
    time,
    duration: session.duration,
    sessionId: session.id
  })

  return (
    <Styles>
      <Card>
        {!isMobile && (
          <CurrentDateCard
            date={session.starts_at}
            className="reschedule-session__current-card"
          />
        )}

        {isMobile && (
          <h3 className="reschedule-form__title">{t('sessions:reschedule')}</h3>
        )}

        <form>
          <DatePicker
            id="reschedule-date"
            label={t('sessions:new-date')}
            className="reschedule-form__form-item"
            value={date}
            onChange={(e, date) => setFieldValue('date', date)}
            disabledDate={(date) => date.isBefore(moment().startOf('day'))}
            error={touched.date && errors.date ? errors.date : ''}
          />
          <TimePicker
            id="reschedule-time"
            label={t('sessions:new-time')}
            className="reschedule-form__form-item"
            value={time}
            onChange={(e, date) => setFieldValue('time', date)}
            disabledUntilNow={moment(date).isSame(moment(), 'days')}
            error={touched.time && errors.time ? errors.time : ''}
          />

          <Button className="reschedule-form__submit-btn" onClick={submitForm}>
            {t(isBusy ? 'sessions:request-anyway' : 'sessions:reschedule')}
          </Button>
        </form>
      </Card>
    </Styles>
  )
}
