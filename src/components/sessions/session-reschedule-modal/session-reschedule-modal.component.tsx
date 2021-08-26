import { FormikHelpers, useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { CalendarBoldIcon } from '../../../assets/media/icons'
import { ReactComponent as ClockIcon } from '../../../assets/media/icons/clock.svg'
import { useIsBusy } from '../../../hooks/sessions.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { date as datePipe } from '../../../pipes/date.pipe'
import { ACTION_CLIENT_RESCHEDULE_SESSION_REQUEST } from '../../../store/action-types'
import { SessionType } from '../../../types/session.type'
import Button from '../../buttons/button/button.component'
import Card from '../../cards/card/card.component'
import CurrentDateCard from '../../cards/current-date-card/current-date-card.component'
import Dialog from '../../dialogs/dialog/dialog.component'
import DatePicker from '../../form/date-picker/date-picker.component'
import TimePicker from '../../form/time-picker/time-picker.component'
import Styles from './session-reschedule-modal.styles'

type Props = {
  onClose: () => void
  session: SessionType
  open: boolean
}

type RescheduleFormType = {
  date: string
  time: string
  duration: string
}

function SessionRescheduleModalContent({ session, onClose }: Props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()

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
        time: moment(time, 'HH:mm').format('HH:mm:ss')
      }
    })

    helper.setSubmitting(false)
    onClose()
  }

  const { values, submitForm, setFieldValue, setValues } = useFormik({
    initialValues: {
      date: '',
      time: '',
      duration: ''
    },
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
        <CurrentDateCard
          date={session.starts_at}
          className="reschedule-session__current-card"
        />

        <form>
          <DatePicker
            id="reschedule-date"
            label={t('sessions:new-date')}
            className="reschedule-session__form-item"
            value={date}
            onChange={(e, date) => setFieldValue('date', date)}
          />
          <TimePicker
            id="reschedule-time"
            label={t('sessions:new-time')}
            className="reschedule-session__form-item"
            value={time}
            onChange={(e, date) => setFieldValue('time', date)}
          />

          <Button
            className="reschedule-session__submit-btn"
            onClick={submitForm}
          >
            {t(isBusy ? 'sessions:request-anyway' : 'sessions:reschedule')}
          </Button>
        </form>
      </Card>
    </Styles>
  )
}

interface SessionRescheduleModalProps {
  session?: SessionType
  open: boolean
  onClose: any
}

const SessionRescheduleModal = (props: SessionRescheduleModalProps) => {
  const { t } = useTranslation()
  return (
    <Dialog
      title={t('sessions:reschedule')}
      open={props.open}
      onClose={props.onClose}
    >
      {props.session && (
        <SessionRescheduleModalContent {...props} session={props.session} />
      )}
    </Dialog>
  )
}

export default SessionRescheduleModal
