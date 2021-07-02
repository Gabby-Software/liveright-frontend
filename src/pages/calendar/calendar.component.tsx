import React, {useContext, useState} from 'react';
import Styles from './calendar.styles';
import {FormSwitchUI} from "../../components/forms/form-switch/form-switch.component";
import {calendarView} from "../../enums/calendar-views.enum";
import {OptionType} from "../../types/option.type";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import CalendarMonth from "./calendar-month/calendar-month.component";
import CalendarWeek from "./calendar-week/calendar-week.component";
import CalendarProvider, {CalendarContext} from "./calendar.context";
import CalendarHeading from "./calendar-heading/calendar-heading.component";
import CalendarFooter from "../../components/calendar/calendar-footer/calendar-footer.component";

const Calendar = () => {
    const {view} = useContext(CalendarContext);
    return (
        <Styles>
            <CalendarHeading/>
            {
                view === calendarView.MONTH?(
                    <CalendarMonth/>
                ): (
                    <CalendarWeek/>
                )
            }
            <CalendarFooter/>
        </Styles>
    )
};

export default () => <CalendarProvider><Calendar/></CalendarProvider>;
