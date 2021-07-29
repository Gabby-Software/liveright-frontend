import React, {useState, useEffect} from 'react';
import Styles from './add-session-calendar.styles';
import PageSubtitle from "../../../../../components/titles/page-subtitle.styles";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import AddSessionCalendarEmpty from "../add-session-calendar-empty/add-session-calendar-empty.component";
import AddSessionCalendarFull from "../add-session-calendar-full/add-session-calendar-full.component";

type Props = {};
const AddSessionCalendar = ({}:Props) => {
    const {t} = useTranslation();
    return (
        <Styles>
            <PageSubtitle>{t('sessions:calendar-view')}</PageSubtitle>
            {
                Math.random() > .5 ? (
                    <AddSessionCalendarEmpty/>
                ) : (
                    <AddSessionCalendarFull/>
                )
            }
        </Styles>
    )
};

export default AddSessionCalendar;
