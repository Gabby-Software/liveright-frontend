import React, {useState, useEffect, useMemo} from 'react';
import Styles from './add-session-calendar-full.styles';
import {Field, FieldProps} from "formik";
import AddSessionCalendarEmpty from "../add-session-calendar-empty/add-session-calendar-empty.component";
import {useIsMobile} from "../../../../../hooks/is-mobile.hook";
import {forOf} from "../../../../../pipes/for-of.pipe";
import moment from 'moment';
import {classes} from "../../../../../pipes/classes.pipe";
import logger from "../../../../../managers/logger.manager";
import CalendarRangeView from "../../../../../components/calendar-range-view/calendar-range-view.component";

type EventType = {
    time: string;
    name: string;
    duration: number;
}
export const events: EventType[] = [
    {time: '02:00', name: 'Session with Chupma Champa', duration: 30},
    {time: '10:00', name: 'Session with Vlad Tzepesh', duration: 30},
    {time: '14:00', name: 'Session with David Coperfiled', duration: 60},
    {time: '18:20', name: 'Daily Sync', duration: 40},
    {time: '22:45', name: 'State of the Elephant', duration: 90},
];
const hour = (time: string) => +time.split(':')[0];
const minute = (time: string) => +time.split(':')[1];
export const collapse = (time1: string, dur1: number, time2: string, dur2: number) => {
    const t1 = hour(time1) + minute(time1) / 60;
    const t2 = hour(time2) + minute(time2) / 60;
    const t1d = t1 + dur1 / 60;
    const t2d = t2 + dur2 / 60;
    return !(t1 >= t2d || t1d <= t2);
};
type Props = {};
const AddSessionCalendarFull = ({}: Props) => {
    const isMobile = useIsMobile();
    const calendarRange = useMemo(() => isMobile ? 2 : 4, [isMobile]);
    return (
        <Field name={'time'}>
            {
                ({field, form}: FieldProps) => {
                    return (
                        <CalendarRangeView current={{
                            name: "Session with Frank Trainee",
                            date: form.values.date,
                            time: field.value,
                            duration: form.values.duration
                        }}
                                           suggested={{
                                               name: "Suggested time",
                                               date: "2021-03-04",
                                               time: "12:30",
                                               duration: 30
                                           }}/>
                    );
                }
            }
        </Field>
    );
};
/*

<Styles>
                            {
                                forOf(calendarRange*2+1, (i: number) => (
                                    <div className={'add-session__calendar__item'}>
                                        <div className={'add-session__calendar__time'}>{String(((hour(form.values.time)-calendarRange+i+24)%24)||24).padStart(2, '0')}:00</div>
                                        {
                                            events.filter(e => hour(e.time) === (((hour(form.values.time)-calendarRange+i+24)%24)||24))
                                                .map(({time, duration, name}) => (
                                                    <div className={
                                                        classes('add-session__calendar__event', collapse(time, duration, form.values.time, +form.values.duration) && 'add-session__calendar__event__overlap')
                                                    }
                                                         style={{top: `${minute(time)/60*100}%`, height: `${duration/60*100}%`}}>
                                                        {name}</div>
                                                ))
                                        }
                                        {
                                            i === calendarRange ? (
                                                <div className={classes('add-session__calendar__event', 'add-session__calendar__event__current')}
                                                    style={{top: `${minute(form.values.time)/60*100}%`, height: `${(form.values.duration||0)/60*100}%`}}>
                                                    {'Session with Frank Trainee'}
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                ))
                            }
                        </Styles>
 */
export default AddSessionCalendarFull;
