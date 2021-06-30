import React, {useState, useEffect} from 'react';
import Styles from './header.styles';
import {Link, useLocation} from 'react-router-dom';
import profilePlaceholder from '../../assets/media/profile-placeholder.png';
import {classes} from "../../pipes/classes.pipe";
import {useHeader} from "../../hooks/header.hook";
import {HeaderItemType, HeaderItemTypes} from "../../types/route.type";

const Header = () => {
    const {pathname} = useLocation();
    const {title, items} = useHeader();
    const renderHeaderItem = ({type, href, Icon}: HeaderItemType) => {
        switch (type) {
            case HeaderItemTypes.IMAGE:
                return (
                    <Link to={href || ''} className={'header__profile'}>
                        <img alt={'trainer'} src={profilePlaceholder}/>
                    </Link>
                );
            case HeaderItemTypes.ICON:
                Icon = Icon as React.ComponentType;
                return (
                    <Link to={href || ''}
                          className={classes('header__icon',
                              pathname === href && 'header__icon__active')}>
                        <Icon/>
                    </Link>
                );
            case HeaderItemTypes.SPACE:
                return (
                    <div className={'header__space'}/>
                );
            case HeaderItemTypes.SUBMIT:
                Icon = Icon as React.ComponentType;
                return (
                    <label className={'header__icon'} htmlFor={'form-submit'}>
                        <Icon/>
                    </label>
                );
        }
    };
    return (
        <Styles>
            <div className={'header__placeholder'}/>
            <nav className={'header__nav'}>
                <h1 className={'header__title'}>{title}</h1>
                {items?.map((t,i) => <React.Fragment key={i}>{renderHeaderItem(t)}</React.Fragment>)}
            </nav>
        </Styles>
    );
};

export default Header;
