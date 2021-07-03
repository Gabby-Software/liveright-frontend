import React, {useState, useEffect} from 'react';
import Styles from './calendar-week.styles';
import {useCalendar} from "../calendar.hook";
import {forOf} from "../../../pipes/for-of.pipe";
import CalendarDay from "../../../components/calendar/calendar-day/calendar-day.component";
import moment from "moment";
import Hr from "../../../components/hr/hr.styles";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import Card from "../../../components/card/card.style";

type ActivityType = {
    name: string;
    time: string;
}
const activities:ActivityType[] = [
    {name: 'Low Carb Diet', time: '05:30'},
    {name: 'Push Workout', time: '10:45'},
    {name: 'Push Workout', time: '16:30'},
];
const CalendarWeek = () => {
    const {currentDate, startDisplay, today} = useCalendar('week');
    const {t} = useTranslation();
    return (
        <Styles>
            <div className={'calendar-week'}>
            {
                forOf(7, (i) => {
                    const d = moment(startDisplay).add(i, 'days');
                    const isPast = d.isBefore(today,'day');
                    const isSelected = d.isSame(currentDate, 'day');
                    return (
                            <CalendarDay date={d} disabled={isPast} current={isSelected}/>
                    )
                })
            }
            </div>
            <Hr/>
            <div className={'calendar-week__activities'}>
            <h2>{t('calendar:activities')}</h2>
            {
                activities.map(act => (
                    <Card className={'calendar-week__activity'}>
                        <span>{act.name}</span>
                        <span>{act.time}</span>
                    </Card>
                ))
            }
            </div>
        </Styles>
    );
};

export default CalendarWeek;
