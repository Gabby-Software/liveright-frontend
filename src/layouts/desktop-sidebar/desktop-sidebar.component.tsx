import React, {useState, useEffect} from 'react';
import Styles from './desktop-sidebar.styles';
import {Link, useLocation} from 'react-router-dom';
import {ReactComponent as LogoSmall} from '../../assets/media/icons/logo-small.svg';
import {ReactComponent as HomeIcon} from "../../assets/media/icons/home.svg";
import {ReactComponent as PlanIcon} from "../../assets/media/icons/plan.svg";
import {ReactComponent as ProgressIcon} from "../../assets/media/icons/progress.svg";
import {ReactComponent as LibraryIcon} from "../../assets/media/icons/library.svg";
import {ReactComponent as InvoiceIcon} from "../../assets/media/icons/invoice.svg";
import {ReactComponent as SessionIcon} from "../../assets/media/icons/session.svg";
import {ReactComponent as RightArrowIcon} from "../../assets/media/icons/right-arrow.svg";
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {classes} from "../../pipes/classes.pipe";

type MenuItemType = {
    name: string;
    Icon: React.ComponentType,
    url: string;
}
const menuItems: MenuItemType[] = [
    {name: 'home', url: '/', Icon: HomeIcon},
    {name: 'plans', url: '/plans', Icon: PlanIcon},
    {name: 'progress', url: '/progress', Icon: ProgressIcon},
    {name: 'library', url: '/library', Icon: LibraryIcon},
    {name: 'invoices', url: '/invoices', Icon: InvoiceIcon},
    {name: 'sessions', url: '/sessions', Icon: SessionIcon},
];
const DesktopSidebar = () => {
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Styles className={classes('sidebar', isOpen && 'sidebar__open')}>
            <div className={'sidebar__logo'}>
                <LogoSmall/>
            </div>
            <nav className={'sidebar__nav'}>
                <ul className={'sidebar__menu'}>
                    {
                        menuItems.map(({name, url, Icon}) => (
                            <li key={url} className={classes('sidebar__item', pathname === url && 'sidebar__item__active')}>
                                <Link to={url}>
                                    <Icon/>
                                    <span className={'sidebar__item__label'}>{t(`menu.${name}`)}</span>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <RightArrowIcon className={'sidebar__collapse'} onClick={() => setIsOpen(!isOpen)}/>
            </nav>
        </Styles>
    );
};

export default DesktopSidebar;
