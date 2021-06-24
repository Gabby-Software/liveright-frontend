import React, {useState, useEffect} from 'react';
import Styles from './header.styles';
import {Link} from 'react-router-dom';
import {ReactComponent as CalendarIcon} from '../../assets/media/icons/calendar.svg';
import {ReactComponent as BellIcon} from '../../assets/media/icons/bell.svg';
import profilePlaceholder from '../../assets/media/profile-placeholder.png';

const Header = () => {
    return (
        <Styles>
            <div className={'header__placeholder'}/>
            <nav className={'header__nav'}>
                <Link to={'/chat'} className={'header__profile'}>
                    <img alt={'trainer'} src={profilePlaceholder}/>
                </Link>
                <div className={'header__space'}/>
                <h1 className={'header__title'}>LiveRight</h1>
                <Link to={'/calendar'} className={'header__icon'}>
                    <CalendarIcon/>
                </Link>
                <Link to={'/notifications'} className={'header__icon'}>
                    <BellIcon/>
                </Link>
            </nav>
        </Styles>
    );
};

export default Header;
