import React, {useState, useEffect, ComponentType} from 'react';
import Styles from './mobile-more-drawer.styles';
import BottomDrawer from "../bottom-drawer/bottom-drawer.component";
import {Link} from 'react-router-dom';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {ReactComponent as ProfileIcon} from "../../assets/media/icons/profile.svg";
import {ReactComponent as UsersIcon} from "../../assets/media/icons/users.svg";
import {ReactComponent as LibraryIcon} from "../../assets/media/icons/library.svg";
import {ReactComponent as InvoiceIcon} from "../../assets/media/icons/invoice.svg";
import {ReactComponent as SessionIcon} from "../../assets/media/icons/session.svg";
import {ReactComponent as SyncIcon} from "../../assets/media/icons/sync.svg";
import {ReactComponent as SettingsIcon} from "../../assets/media/icons/settings.svg";
import SwitchAccountModal from "../switch-account-modal/switch-account-modal.component";
import userTypes from "../../enums/user-types.enum";

type MobileMoreDrawerPropsType = {
    isOpen: boolean;
    onClose: () => void;
};
type LinkType = {
    Icon: ComponentType,
    onClick?: () => void;
    url?: string;
    name: string;
    permission?: string;
};

const MobileMoreDrawer = ({isOpen, onClose}: MobileMoreDrawerPropsType) => {
    const {t} = useTranslation();
    const [switchAccountOpen, setSwitchAccountOpen] = useState(false);
    const menuItems: LinkType[] = [
        {Icon: ProfileIcon, url: '/profile', name: 'menu.profile'},
        {Icon: UsersIcon, url: '/clients', name: 'menu.clients', permission: userTypes.TRAINER},
        {Icon: LibraryIcon, url: '/library', name: 'menu.library'},
        {Icon: InvoiceIcon, url: '/invoices', name: 'menu.invoices'},
        {Icon: SessionIcon, url: '/sessions', name: 'menu.sessions'},
        {Icon: SyncIcon, onClick: () => {setSwitchAccountOpen(true);onClose()}, name: 'menu.switch-account'},
        {Icon: SettingsIcon, url: '/settings', name: 'menu.settings'},
    ];
    return (
        <>
            <BottomDrawer
                isOpen={isOpen}
                onClose={onClose}
                title={t("menu.more")}>
                <Styles>
                    <ul className={'more__menu'}>
                        {
                            menuItems.map(({onClick, Icon, url, name}) => (
                                <li className={'more__item'} key={url}>
                                    {
                                        url ? (
                                            <Link to={url} onClick={onClose}>
                                                <Icon/>
                                                <span className={'more__label'}>{t(name)}</span>
                                            </Link>
                                        ): (
                                            <a onClick={onClick}>
                                                <Icon/>
                                                <span className={'more__label'}>{t(name)}</span>
                                            </a>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </Styles>
            </BottomDrawer>
            <SwitchAccountModal isOpen={switchAccountOpen} onClose={() => setSwitchAccountOpen(false)}/>
        </>
    );
};

export default MobileMoreDrawer;
