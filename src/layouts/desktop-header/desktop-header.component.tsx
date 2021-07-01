import React, {useState, useEffect} from 'react';
import Styles from './desktop-header.styles';
import {Link, useLocation} from "react-router-dom";
import profilePlaceholder from '../../assets/media/profile-placeholder.png';
import {ReactComponent as BellIcon} from '../../assets/media/icons/bell.svg';
import {ReactComponent as CalendarIcon} from '../../assets/media/icons/calendar.svg';
import {classes} from "../../pipes/classes.pipe";
import {useHeader} from "../../hooks/header.hook";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import Dropdown from "../../components/forms/dropdown/dropdown.component";
import {MenuItemType} from "../../types/menu-item.type";
import {Routes} from "../../enums/routes.enum";
import {useAuth} from "../../hooks/auth.hook";
import {capitalize} from "../../pipes/capitalize.pipe";
import ProfileImage from "../../components/profile-image/profile-image.component";
import {noImage} from "../../pipes/no-image.pipe";
import {useDispatch} from "react-redux";
import {ACTION_LOGOUT_REQUEST} from "../../store/action-types";
import ProfileAccount from "../../components/profile/profile-account/profile-account.component";

type AccountType = {
    name: string;
    type: string;
    image: string;
    active: boolean;
};
const acc:AccountType[] = [
    {name: 'Chris Hemington', type: 'Client', image: profilePlaceholder, active: true},
    {name: 'John Doe', type: 'Trainer', image: profilePlaceholder, active: false},
];
const DesktopHeader = () => {
    const {pathname} = useLocation();
    const {title} = useHeader();
    const {t} = useTranslation();
    const {avatar_thumb, first_name, last_name, accounts, uuid} = useAuth();
    const dispatch = useDispatch();
    const switchAccount = () => {

    };
    const logout = () => {
        dispatch({type: ACTION_LOGOUT_REQUEST});
    };
    const dropdownMenu: (MenuItemType | React.ReactNode)[] = [
        ...acc.map((account,i) => (
            <li>
            <ProfileAccount noRadio key={account.name} {...account}
                            className={classes('desktop-header__account', i===acc.length-1&&'desktop-header__hr')}/>
            </li>
        )),
        {name: t('menu.personal-details'), url: Routes.PROFILE},
        {name: t('menu.settings'), url: Routes.SETTINGS},
        {name: t('menu.log-out'), onClick: logout},
    ];
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
            <Dropdown menu={dropdownMenu}>
                <ProfileImage url={avatar_thumb} placeholder={noImage(first_name,last_name)}
                              className={'desktop-header__profile__img'}/>
                <div className={'desktop-header__profile__info'}>
                    <div className={'desktop-header__profile__name'}>{capitalize(`${first_name} ${last_name}`)}</div>
                    <div className={'desktop-header__profile__type'}>{capitalize(accounts.find(({uuid: u}) => u === uuid)?.type)}</div>
                </div>
            </Dropdown>
        </Styles>
    );
};

export default DesktopHeader;
