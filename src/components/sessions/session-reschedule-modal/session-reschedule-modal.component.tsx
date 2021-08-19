import { Form, Formik, FormikHelpers } from 'formik'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import { ReactComponent as CalendarIcon } from '../../../assets/media/icons/calendar.svg'
import { ReactComponent as ClockIcon } from '../../../assets/media/icons/clock.svg'
import { Routes } from '../../../enums/routes.enum'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { useIsBusy } from '../../../hooks/sessions.hook'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { date as datePipe } from '../../../pipes/date.pipe'
import { ACTION_CLIENT_RESCHEDULE_SESSION_REQUEST } from '../../../store/action-types'
import { SessionType } from '../../../types/session.type'
import BottomDrawer from '../../bottom-drawer/bottom-drawer.component'
import ButtonSubmit from '../../forms/button-submit/button-submit.component'
import FormDatepicker from '../../forms/form-datepicker/form-datepicker.component'
import FormTimepicker from '../../forms/form-timepicker/form-timepicker.component'
import Modal from '../../modal/modal.component'
import PrimaryLabel from '../../primary-label/primary-label.component'
import Styles, { Row } from './session-reschedule-modal.styles'

type Props = {
  onClose: () => void
  session: SessionType
}
type RescheduleFormType = {
  date: string
  time: string
  duration: string
}
const SessionRescheduleModal = ({ session, onClose }: Props) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const initialValues: RescheduleFormType = useMemo(() => {
    return {
      date: moment(session.starts_at).format('YYYY-MM-DD'),
      time: moment.utc(session.starts_at).format('HH:mm'),
      duration: moment(session.duration, 'HH:mm:ss').format('HH:mm')
    }
  }, [session])
  const [date, setDate] = useState(initialValues.date)
  const [time, setTime] = useState(initialValues.time)
  const isBusy = useIsBusy({
    date,
    time,
    duration: session.duration,
    sessionId: session.id
  })

  const Wrapper = useMemo(
    () =>
      !isMobile
        ? ({ children }: { children: React.ReactNode }) => (
            <Modal visible={!!session} onCancel={onClose}>
              {children}
            </Modal>
          )
        : ({ children }: { children: React.ReactNode }) => (
            <BottomDrawer isOpen={!!session} onClose={onClose}>
              <BottomDrawer.Body>{children}</BottomDrawer.Body>
            </BottomDrawer>
          ),
    [isMobile, session, onClose]
  )

  const handleDateUpdate = (_: string, value: string) => {
    setDate(value)
  }

  const handleTimeUpdate = (_: string, value: string) => {
    setTime(value)
  }

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

  if (!session) {
    return null
  }

  return (
    <Wrapper>
      <Modal.Title>{t('sessions:reschedule')}</Modal.Title>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          date: Yup.date().min(moment().startOf('day')).required(),
          time: Yup.string().required()
        })}
      >
        {({ values }) => {
          const isToday = moment(values.date).isSame(moment(), 'days')

          return (
            <Form>
              <Styles>
                <div className={'reschedule__current'}>
                  <PrimaryLabel className={'reschedule__current__label'}>
                    {t('sessions:currently')}
                  </PrimaryLabel>
                  <div className={'reschedule__current__item'}>
                    <CalendarIcon />
                    <span>{datePipe(session.starts_at)}</span>
                  </div>
                  <div className={'reschedule__current__item'}>
                    <ClockIcon />
                    <span>{moment.utc(session.starts_at).format('HH:mm')}</span>
                  </div>
                </div>
                <Row>
                  <FormDatepicker
                    name={'date'}
                    label={t('sessions:date')}
                    disabledDate={(date) =>
                      moment(date).isBefore(moment(), 'days')
                    }
                    onUpdate={handleDateUpdate}
                  />
                  <FormTimepicker
                    name={'time'}
                    label={t('sessions:time')}
                    disabledUntilNow={isToday}
                    onUpdate={handleTimeUpdate}
                  />
                </Row>
                {isBusy ? (
                  <div className={'reschedule__warning'}>
                    <span>{t('sessions:reschedule-warning')}</span>
                    <Link to={Routes.CALENDAR}>
                      {t('sessions:go-to-calendar')}
                    </Link>
                  </div>
                ) : null}
                <ButtonSubmit>
                  {t(
                    `sessions:${isBusy ? 'request-anyway' : 'session-request'}`
                  )}
                </ButtonSubmit>
              </Styles>
            </Form>
          )
        }}
      </Formik>
    </Wrapper>
  )
}

export default SessionRescheduleModal
