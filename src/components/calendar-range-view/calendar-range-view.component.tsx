import React, {useState, useEffect, useMemo} from 'react';
import moment from 'moment';
import Styles from "./calendar-range-view.styles";
import {forOf} from "../../pipes/for-of.pipe";
import {classes} from "../../pipes/classes.pipe";
import {useIsMobile} from "../../hooks/is-mobile.hook";
import AddSessionCalendarEmpty
    from "../../pages/sessions/sections/add-session/add-session-calendar-empty/add-session-calendar-empty.component";


type EventType = {
    date: string;
    time: string;
    name: string;
    duration: number;
}
export const events: EventType[] = [
    {date: '2021-12-12', time: '02:00', name: 'Session with Chupma Champa', duration: 30},
    {date: '2021-12-12', time: '10:00', name: 'Session with Vlad Tzepesh', duration: 30},
    {date: '2021-12-12', time: '14:00', name: 'Session with David Coperfiled', duration: 60},
    {date: '2021-12-12', time: '18:20', name: 'Daily Sync', duration: 40},
    {date: '2021-12-12', time: '22:45', name: 'State of the Elephant', duration: 90},
];
const hour = (time:string) => +time.split(':')[0];
const minute = (time:string) => +time.split(':')[1];
export const collapse = (time1:string, dur1:number, time2:string, dur2: number) => {
    const t1 =  hour(time1) + minute(time1)/60;
    const t2 = hour(time2) + minute(time2)/60;
    const t1d = t1+dur1/60;
    const t2d = t2+dur2/60;
    return !(t1 >= t2d || t1d <= t2);
};
type Props = {
    current: EventType,
    suggested: EventType
};
const CalendarRangeView = ({current, suggested}:Props) => {
    const isMobile = useIsMobile();
    const calendarRange = useMemo(() => isMobile ? 2 : 4, [isMobile]);
    if(!current.date || !current.time) {
        return <AddSessionCalendarEmpty/>;
    }
    return (
        <Styles>
            {
                forOf(calendarRange*2+1, (i: number) => (
                    <div className={'add-session__calendar__item'}>
                        <div className={'add-session__calendar__time'}>{String(((hour(current.time)-calendarRange+i+24)%24)||24).padStart(2, '0')}:00</div>
                        {
                            events.filter(e => hour(e.time) === (((hour(current.time)-calendarRange+i+24)%24)||24))
                                .map(({time, duration, name}) => (
                                    <div className={
                                        classes('add-session__calendar__event', collapse(time, duration, current.time, +current.duration) && 'add-session__calendar__event__overlap')
                                    }
                                         style={{top: `${minute(time)/60*100}%`, height: `${duration/60*100}%`}}>
                                        {name}</div>
                                ))
                        }
                        {
                            hour(suggested.time) === (((hour(current.time)-calendarRange+i+24)%24)||24) ? (
                                <div className={classes('add-session__calendar__event', 'add-session__calendar__event__suggested')}
                                     style={{top: `${minute(suggested.time)/60*100}%`, height: `${(suggested.duration||0)/60*100}%`}}>
                                    {suggested.name}
                                </div>
                            ) : null
                        }
                        {
                            i === calendarRange ? (
                                <div className={classes('add-session__calendar__event', 'add-session__calendar__event__current')}
                                     style={{top: `${minute(current.time)/60*100}%`, height: `${(current.duration||0)/60*100}%`}}>
                                    {current.name}
                                </div>
                            ) : null
                        }
                    </div>
                ))
            }
        </Styles>
    );
};

export default CalendarRangeView;
