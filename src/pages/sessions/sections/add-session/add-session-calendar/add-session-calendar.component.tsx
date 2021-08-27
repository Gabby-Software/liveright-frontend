/* eslint-disable react/jsx-key */
import { useFormikContext } from 'formik'
import moment, { Moment } from 'moment'
import React, { useEffect, useMemo, useState } from 'react'

import { EP_GET_SESSIONS } from '../../../../../enums/api.enum'
import { useClients } from '../../../../../hooks/clients.hook'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import api from '../../../../../managers/api.manager'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { classes } from '../../../../../pipes/classes.pipe'
import { dateHoursRange } from '../../../../../pipes/date-range.pipe'
import { checkIfBusy } from '../../../../../pipes/sessions-busy.pipe'
import { SessionType } from '../../../../../types/session.type'
import AddSessionCalendarEmpty from '../add-session-calendar-empty/add-session-calendar-empty.component'
import { AddSessionFormType } from '../add-session-form/add-session-form.component'
import { getStyleHelper } from './add-session-calendar.helpers'
import Styles, { CalendarWrapper } from './add-session-calendar.styles'

const AddSessionCalendar: React.FC = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const clients = useClients()
  const { values, setFieldValue } = useFormikContext<AddSessionFormType>()

  const { date, time, duration, client_id, session_id, client_request } = values

  const start_date = moment.utc(`${date} ${time}`, 'YYYY-MM-DD HH:mm')

  const range = useMemo(() => (isMobile ? 2 : 4), [isMobile])

  const dates = useMemo(
    () => dateHoursRange({ date: start_date, range }),
    [date, time]
  )

  const [sessions, setSessions] = useState<SessionType[]>([])
  const client = useMemo(
    () => clients.data.data.find((it) => it.id === Number(client_id)),
    [clients]
  )

  const renderCurrentEvent = () => {
    return (
      <div
        className={classes(
          'add-session__calendar__event',
          'add-session__calendar__event__current'
        )}
        style={getStyleHelper(start_date, duration)}
      >
        Session with {client?.first_name} {client?.last_name}
      </div>
    )
  }

  const renderSuggestedSession = (dateItem: Moment) => {
    if (!client_request) {
      return null
    }

    const suggestedStart = moment.utc(
      `${client_request.date} ${client_request.time}`
    )
    const hasSuggestedEvent =
      suggestedStart.isBetween(dateItem, moment(dateItem).add(1, 'hours')) ||
      suggestedStart.isSame(moment(dateItem))

    if (!hasSuggestedEvent || suggestedStart.isSame(start_date)) {
      return null
    }

    return (
      <div
        className={classes(
          'add-session__calendar__event',
          'add-session__calendar__event__suggested'
        )}
        style={getStyleHelper(suggestedStart, client_request.duration)}
      >
        Suggested session with {client?.first_name} {client?.last_name}
      </div>
    )
  }

  const renderDateSessions = (dateSessions: SessionType[]) => {
    return dateSessions.map((it) => {
      return (
        <div
          className={classes(
            'add-session__calendar__event',
            'add-session__calendar__event__overlap'
          )}
          style={getStyleHelper(moment(it.starts_at), it.duration)}
        >
          Session with {it.client?.user.first_name} {it.client?.user.last_name}
        </div>
      )
    })
  }

  useEffect(() => {
    if (!date || !time) {
      return
    }

    const getSessions = async () => {
      const paramsString = `?include=client.user&filter[date]=${date}&filter[status]=upcoming`

      try {
        const { data } = (await api.get(EP_GET_SESSIONS + paramsString)) as {
          data: { data: SessionType[] }
        }

        if (data.data) {
          const filteredSessions = data.data.filter(
            (it) => it.id !== session_id
          )
          setSessions(filteredSessions)
        }
      } catch (e) {
        console.log(e)
      }
    }

    getSessions()
  }, [date, time])

  useEffect(() => {
    setFieldValue(
      'isBusy',
      checkIfBusy({
        sessions,
        duration,
        currentStartDate: start_date
      })
    )
  }, [sessions, date, time, duration])

  return (
    <Styles>
      <h3 className="add-session__form-title">{t('sessions:calendar-view')}</h3>

      {date && time ? (
        <>
          {/*<div className="add-session__calendar-nav">*/}
          {/*  <p className="add-session__calendar-nav-date">*/}
          {/*    {start_date.format('YYYY-MM-DD')}*/}
          {/*  </p>*/}
          {/*</div>*/}

          {/*<div className="add-session__calendar-nav-divider" />*/}

          <div className="add-session__calendar-current">
            <p className="add-session__calendar-current-weekday">
              {start_date.format('ddd')}
            </p>
            <span className="add-session__calendar-current-day">
              {start_date.format('DD')}
            </span>
          </div>

          <CalendarWrapper>
            <div className="add-session__calendar-divider" />

            {dates.map((it, index) => {
              const hasCurrentEvent =
                start_date.isBetween(it, moment(it).add(1, 'hours')) ||
                start_date.isSame(moment(it))

              const dateSessions = sessions.filter((session) => {
                const startMoment = moment.utc(session.starts_at)
                return (
                  startMoment.isBetween(it, moment(it).add(1, 'hours')) ||
                  startMoment.isSame(moment(it))
                )
              })

              return (
                <div key={index} className={'add-session__calendar__item'}>
                  <div className={'add-session__calendar__time'}>
                    {it.format('HH:mm')}
                  </div>
                  {hasCurrentEvent ? renderCurrentEvent() : null}
                  {renderDateSessions(dateSessions)}
                  {renderSuggestedSession(it)}
                </div>
              )
            })}
          </CalendarWrapper>
        </>
      ) : (
        <AddSessionCalendarEmpty />
      )}
    </Styles>
  )
}

export default AddSessionCalendar
