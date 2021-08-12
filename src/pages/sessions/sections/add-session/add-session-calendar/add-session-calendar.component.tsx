import React, {useEffect, useMemo, useState} from 'react';
import moment from "moment";
import Styles, {CalendarWrapper} from './add-session-calendar.styles';
import PageSubtitle from "../../../../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {useIsMobile} from "../../../../../hooks/is-mobile.hook";
import {useFormikContext} from "formik";
import {AddSessionFormType} from "../add-session-form/add-session-form.component";
import {useClients} from "../../../../../hooks/clients.hook";
import AddSessionCalendarEmpty from "../add-session-calendar-empty/add-session-calendar-empty.component";
import {dateHoursRange} from "../../../../../pipes/date-range.pipe";
import {classes} from "../../../../../pipes/classes.pipe";
import {getStyleHelper} from "./add-session-calendar.helpers";
import {SessionType} from "../../../../../types/session.type";
import {EP_GET_SESSIONS} from "../../../../../enums/api.enum";
import api from "../../../../../managers/api.manager";
import {checkIfBusy} from "../../../../../pipes/sessions-busy.pipe";

const AddSessionCalendar: React.FC = () => {
    const {t} = useTranslation();
    const isMobile = useIsMobile();
    const clients = useClients();
    const {values, setFieldValue} = useFormikContext<AddSessionFormType>();
    const {date, time, duration, client_id, session_id} = values;
    const start_date = moment.utc(`${date} ${time}`);
    const range = useMemo(() => isMobile ? 2 : 4, [isMobile]);
    const dates = useMemo(() => dateHoursRange({ date: start_date, range }), [date, time]);
    const [sessions, setSessions] = useState<SessionType[]>([]);

    const renderCurrentEvent = () => {
      const client = clients.data.data.find((it) => it.id === client_id);

      return (
          <div
            className={classes('add-session__calendar__event', 'add-session__calendar__event__current')}
            style={getStyleHelper(start_date, duration)}
          >
            Current session with {client?.first_name} {client?.last_name}
          </div>
      )
    };

  const renderDateSessions = (dateSessions: SessionType[]) => {
      return dateSessions.map((it) => {
        return (
            <div
              className={
                classes('add-session__calendar__event', 'add-session__calendar__event__overlap')
              }
              style={getStyleHelper(moment(it.starts_at), it.duration)}
            >
              Session with {it.client?.user.first_name} {it.client?.user.last_name}
            </div>
        )
      })
    };

    useEffect(() => {
      if (!date || !time) {
        return
      }

      const getSessions = async () => {
        const paramsString = `?include=client.user&filter[date]=${date}&filter[status]=upcoming`;

        try {
          const {data} = await api.get(EP_GET_SESSIONS + paramsString) as {data: {data: SessionType[]}}

          if (data.data) {
            const filteredSessions = data.data.filter((it) => it.id !== session_id)
            setSessions(filteredSessions);
          }
        } catch (e) {
          console.log(e)
        }
      }

      getSessions();
    }, [date, time])

    useEffect(() => {
      setFieldValue('isBusy', checkIfBusy({
        sessions,
        duration,
        currentStartDate: start_date
      }));
    }, [date, time, duration])

    if(!date || !time) {
      return <AddSessionCalendarEmpty />;
    }

    return (
        <Styles>
            <PageSubtitle>{t('sessions:calendar-view')}</PageSubtitle>
            <CalendarWrapper>
              {dates.map((it) => {
                const hasCurrentEvent = start_date.isBetween(it, moment(it).add(1, 'hours')) || start_date.isSame(moment(it))
                const dateSessions = sessions.filter((session) => {
                  const startMoment = moment.utc(session.starts_at);
                  return startMoment.isBetween(it, moment(it).add(1, 'hours')) || startMoment.isSame(moment(it))
                });

                return (
                  <div key={it.format()} className={'add-session__calendar__item'}>
                    <div className={'add-session__calendar__time'}>
                      {it.format('HH:mm')}
                    </div>
                    {hasCurrentEvent ? renderCurrentEvent() : null}
                    {renderDateSessions(dateSessions)}
                  </div>
                )
              })}
            </CalendarWrapper>
        </Styles>
    )
};

export default AddSessionCalendar;
