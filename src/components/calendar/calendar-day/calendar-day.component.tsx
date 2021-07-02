import React, {useState, useEffect, useContext} from 'react';
import Styles from './calendar-day.styles';
import {classes} from "../../../pipes/classes.pipe";
import {Moment} from 'moment';
import {CalendarContext} from "../../../pages/calendar/calendar.context";
import {logStatus} from "../../../enums/log-status.enum";
import {ReactComponent as CheckIcon} from "../../../assets/media/icons/check.svg";
import {ReactComponent as DoubleCheckIcon} from "../../../assets/media/icons/double-check.svg";

type Props = {
    disabled?: boolean;
    current?: boolean;
    date: Moment;
    status?: logStatus
}
const CalendarDay = ({disabled, current, date, status}: Props) => {
    const {setCurrentDate} = useContext(CalendarContext);
    return (
        <Styles className={classes('calendar-day',
            disabled && 'calendar-day__disabled',
            current && 'calendar-day__selected'
        )}
             onClick={() => setCurrentDate(date.toDate())}>
            <div className={'calendar-day__date'}>{date.date()}</div>
            {
                status === logStatus.FULLY_DONE || disabled&&[16,17,18].includes(date.date()) ? (
                    <DoubleCheckIcon className={classes('calendar-day__icon', 'calendar-day__icon__full')}/>
                ) : status === logStatus.PARTIALLY_DONE || disabled&&[12, 13, 14, 15].includes(date.date()) ? (
                    <CheckIcon className={classes('calendar-day__icon', 'calendar-day__icon__partial')}/>
                ) :null
            }
        </Styles>
    );
};

export default CalendarDay;
