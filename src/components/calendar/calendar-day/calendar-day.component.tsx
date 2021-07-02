import React, {useState, useEffect, useContext} from 'react';
import Styles from './calendar-day.styles';
import {classes} from "../../../pipes/classes.pipe";
import {Moment} from 'moment';
import {CalendarContext} from "../../../pages/calendar/calendar.context";
type Props = {
    disabled?: boolean;
    current?: boolean;
    date: Moment;
}
const CalendarDay = ({disabled, current, date}: Props) => {
    const {setCurrentDate} = useContext(CalendarContext);
    return (
        <Styles className={classes('calendar-day',
            disabled && 'calendar-day__disabled',
            current && 'calendar-day__selected'
        )}
             onClick={() => setCurrentDate(date.toDate())}>
            {date.date()}
        </Styles>
    );
};

export default CalendarDay;
