import React, {useState, useEffect} from 'react';
import Styles from './header.styles';
import {Link, useLocation} from 'react-router-dom';
import {ReactComponent as CalendarIcon} from '../../assets/media/icons/calendar.svg';
import {ReactComponent as BellIcon} from '../../assets/media/icons/bell.svg';
import profilePlaceholder from '../../assets/media/profile-placeholder.png';
import {classes} from "../../pipes/classes.pipe";
import {useHeader} from "../../hooks/header.hook";

const Header = () => {
    const {pathname} = useLocation();
    const {title, items, back} = useHeader();
    return (
        <Styles>
            <div className={'header__placeholder'}/>
            <nav className={'header__nav'}>
                <Link to={'/chat'} className={'header__profile'}>
                    <img alt={'trainer'} src={profilePlaceholder}/>
                </Link>
                <div className={'header__space'}/>
                <h1 className={'header__title'}>{title}</h1>
                {
                    items?.map(({url, Icon}) => (
                        <Link to={url} className={classes('header__icon', pathname===url&&'header__icon__active')}>
                            <Icon/>
                        </Link>
                    ))
                }
            </nav>
        </Styles>
    );
};

export default Header;
