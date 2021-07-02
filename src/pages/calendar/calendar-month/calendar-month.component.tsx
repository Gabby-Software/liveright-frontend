import React, {useState, useEffect, useContext, useMemo} from 'react';
import Styles from './calendar-month.styles';
import {forOf} from "../../../pipes/for-of.pipe";
import {CalendarContext} from "../calendar.context";
import moment from 'moment';
import logger from "../../../managers/logger.manager";
import {classes} from "../../../pipes/classes.pipe";
import Animator from "../../../hoc/animator/animator.component";
import CalendarDay from "../../../components/calendar/calendar-day/calendar-day.component";
import {useCalendar} from "../calendar.hook";
import Hr from "../../../components/hr/hr.styles";

const CalendarMonth = () => {
    const {currentDate, startDisplay, today} = useCalendar('month');

    return (
        <Styles>
            <div className={'calendar-month__cont'}>
            {
                forOf(6, (i) => (
                    <div className={'calendar-month__week'}>
                        {
                            forOf(7, (j) => {
                                const d = moment(startDisplay).add(i * 7 + j, 'days');
                                const thisMonth = d.month() === moment(currentDate).month();
                                const isPast = d.isBefore(today);
                                const isSelected = d.isSame(currentDate, 'day');
                                return (
                                    <CalendarDay date={d} disabled={!thisMonth || isPast} current={isSelected}/>
                                )
                            })
                        }
                    </div>
                ))
            }
            </div>
            <Hr/>
        </Styles>
    )
};

export default CalendarMonth;
