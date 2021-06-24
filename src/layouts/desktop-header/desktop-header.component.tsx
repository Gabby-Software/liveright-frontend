import React, {useState, useEffect} from 'react';
import Styles from './desktop-header.styles';
import {Link, useLocation} from "react-router-dom";
import profilePlaceholder from '../../assets/media/profile-placeholder.png';
import {ReactComponent as BellIcon} from '../../assets/media/icons/bell.svg';
import {ReactComponent as CalendarIcon} from '../../assets/media/icons/calendar.svg';
import {classes} from "../../pipes/classes.pipe";
import {useHeader} from "../../hooks/header.hook";
import {useTranslation} from "../../modules/i18n/i18n.hook";

const DesktopHeader = () => {
    const {pathname} = useLocation();
    const {title} = useHeader();
    const {t} = useTranslation();
    return (
        <Styles>
            <h1 className={'desktop-header__title'}>{t(title||'')}</h1>
            <nav className={'desktop-header__nav'}>
                <ul className={'desktop-header__menu'}>
                    <li className={'desktop-header__item'}>
                        <Link to={'/chat'}>
                            <img alt={'trainer'} src={profilePlaceholder} className={'desktop-header__trainer'}/>
                        </Link>
                    </li>
                    <li className={classes('desktop-header__item', pathname === '/calendar' && 'desktop-header__item__active')}>
                        <Link to={'/calendar'}>
                            <CalendarIcon/>
                        </Link>
                    </li>
                    <li className={classes('desktop-header__item', pathname === '/notifications' && 'desktop-header__item__active')}>
                        <Link to={'/notifications'}>
                            <BellIcon/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </Styles>
    );
};

export default DesktopHeader;
