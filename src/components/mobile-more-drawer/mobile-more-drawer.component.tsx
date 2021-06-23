import React, {useState, useEffect, ComponentType} from 'react';
import Styles from './mobile-more-drawer.styles';
import BottomDrawer from "../bottom-drawer/bottom-drawer.component";
import {Link} from 'react-router-dom';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {ReactComponent as ProfileIcon} from "../../assets/media/icons/profile.svg";
import {ReactComponent as LibraryIcon} from "../../assets/media/icons/library.svg";
import {ReactComponent as InvoiceIcon} from "../../assets/media/icons/invoice.svg";
import {ReactComponent as SessionIcon} from "../../assets/media/icons/session.svg";
import {ReactComponent as SettingsIcon} from "../../assets/media/icons/settings.svg";

type MobileMoreDrawerPropsType = {
    isOpen: boolean;
    onClose: () => void;
};
type LinkType = {
    Icon: ComponentType,
    url: string;
    name: string;
};
const menuItems: LinkType[] = [
    {Icon: ProfileIcon, url: '/profile', name: 'menu.profile'},
    {Icon: LibraryIcon, url: '/library', name: 'menu.library'},
    {Icon: InvoiceIcon, url: '/invoices', name: 'menu.invoices'},
    {Icon: SessionIcon, url: '/sessions', name: 'menu.sessions'},
    {Icon: SettingsIcon, url: '/settings', name: 'menu.settings'},
];
const MobileMoreDrawer = ({isOpen, onClose}: MobileMoreDrawerPropsType) => {
    const {t} = useTranslation();
    return (
        <BottomDrawer
            isOpen={isOpen}
            onClose={onClose}
            title={t("more")}>
            <Styles>
                <ul className={'more__menu'}>
                    {
                        menuItems.map(({Icon, url, name}) => (
                            <li className={'more__item'}>
                                <Link to={url} onClick={onClose}>
                                    <Icon/>
                                    <span className={'more__label'}>{t(name)}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </Styles>
        </BottomDrawer>
    );
};

export default MobileMoreDrawer;
