import React, {useState, useEffect, useContext} from 'react';
import Styles from './calendar-heading.styles';
import {FormSwitchUI} from "../../../components/forms/form-switch/form-switch.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {OptionType} from "../../../types/option.type";
import {calendarView} from "../../../enums/calendar-views.enum";
import {CalendarContext} from "../calendar.context";
import {ReactComponent as LeftArrowIcon} from "../../../assets/media/icons/left-arrow.svg";
import {ReactComponent as RightArrowIcon} from "../../../assets/media/icons/right-arrow.svg";
import moment from 'moment';
import {weekEnd, weekStart} from "../../../managers/date.manager";
import {classes} from "../../../pipes/classes.pipe";
import {useIsMobile} from "../../../hooks/is-mobile.hook";
import FormButton from "../../../components/forms/form-button/form-button.component";

const CalendarHeading = () => {
    const {view, setView, currentDate, setCurrentDate} = useContext(CalendarContext);
    const {t} = useTranslation();
    const isMobile = useIsMobile();
    const options: OptionType[] = [
        {value: calendarView.MONTH, label: t('calendar:monthly')},
        {value: calendarView.WEEK, label: t('calendar:weekly')},
    ];
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const goPrev = () => {
        setCurrentDate(moment(currentDate).add(-1, view as 'week' | 'month').toDate());
    };
    const goNext = () => {
        setCurrentDate(moment(currentDate).add(1, view as 'week' | 'month').toDate());
    };
    return (
        <Styles>
            <div className={'calendar-heading__top'}>
                <FormSwitchUI value={view} options={options} onUpdate={setView}/>
                <div className={'calendar-heading__controller'}>
                    <LeftArrowIcon className={'calendar-heading__icon'} onClick={goPrev}/>
                    <div className={classes('calendar-heading__label', view)}>{
                        view === calendarView.MONTH ? moment(currentDate).format('MMMM YYYY')
                            : `${moment(currentDate).startOf('week').format('Do MMM')} - ${moment(currentDate).endOf('week').format('Do MMM')}`
                    }</div>
                    <RightArrowIcon className={'calendar-heading__icon'} onClick={goNext}/>
                </div>
                <FormButton className={classes('calendar-heading__add', 'desktop')} type={'primary'}>{t('calendar:add-activity')}</FormButton>
            </div>
            <div className={'calendar-heading__days'}>
                {
                    days.map(day => (
                        <div
                            className={'calendar-heading__day'}>{t(`calendar:weekday.${isMobile ? 'short' : 'long'}.${day}`)}</div>
                    ))
                }
            </div>
        </Styles>
    )
};

export default CalendarHeading;
