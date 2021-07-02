import React, {useState, useEffect} from 'react';
import Styles from './calendar-footer.styles';
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {ReactComponent as AddIcon} from "../../../assets/media/icons/add.svg";
import {useIsMobile} from "../../../hooks/is-mobile.hook";

const CalendarFooter = () => {
    const {t} = useTranslation();
    const isMobile = useIsMobile();
    if(!isMobile) return null;
    return (
        <Styles>
            <span className={'calendar-footer__title'}>{t('calendar:today')}</span>
            <AddIcon className={'calendar-footer__add'}/>
        </Styles>
    );
};

export default CalendarFooter;
