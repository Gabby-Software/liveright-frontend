import React, {useState, useEffect} from 'react';
import Styles from './desktop-sidebar.styles';
import {Link, useLocation} from 'react-router-dom';
import {ReactComponent as LogoSmall} from '../../assets/media/icons/logo-small.svg';
import {ReactComponent as HomeIcon} from "../../assets/media/icons/home.svg";
import {ReactComponent as UsersIcon} from "../../assets/media/icons/users.svg";
import {ReactComponent as PlanIcon} from "../../assets/media/icons/plan.svg";
import {ReactComponent as ProgressIcon} from "../../assets/media/icons/progress.svg";
import {ReactComponent as LibraryIcon} from "../../assets/media/icons/library.svg";
import {ReactComponent as InvoiceIcon} from "../../assets/media/icons/invoice.svg";
import {ReactComponent as SessionIcon} from "../../assets/media/icons/session.svg";
import {ReactComponent as RightArrowIcon} from "../../assets/media/icons/right-arrow.svg";
import {ReactComponent as BellIcon} from "../../assets/media/icons/bell.svg";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {classes} from "../../pipes/classes.pipe";
import {useAuth} from "../../hooks/auth.hook";
import userTypes from "../../enums/user-types.enum";
import logger from "../../managers/logger.manager";
import {Routes} from "../../enums/routes.enum";
import profilePlaceholder from "../../assets/media/profile-placeholder.png";
import DesktopFooter from "../desktop-footer/desktop-footer.component";
import NotificationIcon from "../../components/notification-icon/notification-icon.component";
import {useClientsTrainer} from "../../hooks/clients-trainer.hook";

type MenuItemType = {
    name: string;
    Icon: React.ComponentType,
    url: string;
    type?: string;
}
const menuItems: MenuItemType[] = [
    {name: 'home', url: '/', Icon: HomeIcon},
    {name: 'clients', url: '/clients', Icon: UsersIcon, type: userTypes.TRAINER},
    {name: 'plans', url: '/plans', Icon: PlanIcon},
    {name: 'progress', url: '/progress', Icon: ProgressIcon},
    {name: 'library', url: '/library', Icon: LibraryIcon},
    {name: 'invoices', url: Routes.INVOICES, Icon: InvoiceIcon},
    {name: 'sessions', url: Routes.SESSIONS, Icon: SessionIcon},
    {name: 'notifications', url: Routes.NOTIFICATIONS, Icon: NotificationIcon},
];
const DesktopSidebar = () => {
    const {t} = useTranslation();
    const {type} = useAuth();
    const {pathname} = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const trainer = useClientsTrainer();
    logger.info('TYPE', type, userTypes.TRAINER, trainer);
    return (
        <Styles className={classes('sidebar', isOpen && 'sidebar__open')}>
            <div className={'sidebar__logo'}>
                <LogoSmall/>
            </div>
            <nav className={'sidebar__nav'}>
                <ul className={'sidebar__menu'}>
                    {
                        menuItems.map(({name, url, Icon, type: permission}) => (
                            !permission || type === permission ?
                            <li key={url} className={classes('sidebar__item', pathname === url && 'sidebar__item__active')}>
                                <Link to={url}>
                                    <Icon/>
                                </Link>
                            </li>
                                : null
                        ))
                    }
                </ul>
                {
                    type === 'client' && trainer ?(
                        <>
                            <div className={'sidebar__hr'}/>
                            <Link to={Routes.TRAINER} className={'sidebar__trainer'}>
                                <img alt={'trainer'} src={trainer.avatar?.thumb_url}/>
                                <span>{t('menu.trainer')}</span>
                            </Link>
                        </>
                    ):null
                }
            </nav>
            <DesktopFooter/>
        </Styles>
    );
};

export default DesktopSidebar;
