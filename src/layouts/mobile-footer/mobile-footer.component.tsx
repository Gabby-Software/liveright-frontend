import React, {useState, useEffect, useMemo} from 'react';
import Styles from './mobile-footer.styles';
import {ReactComponent as HomeIcon} from '../../assets/media/icons/home.svg';
import {ReactComponent as PlanIcon} from '../../assets/media/icons/plan.svg';
import {ReactComponent as ProgressIcon} from '../../assets/media/icons/progress.svg';
import {ReactComponent as MoreIcon} from '../../assets/media/icons/more.svg';
import {ReactComponent as AddIcon} from '../../assets/media/icons/add.svg';
import {ReactComponent as HubIcon} from '../../assets/media/icons/hub.svg';
import {ReactComponent as ProfileIcon} from '../../assets/media/icons/profile.svg';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {Link, useLocation, useParams} from 'react-router-dom';
import MobileLogDrawer from "../../components/mobile-log-drawer/mobile-log-drawer.component";
import MobileMoreDrawer from "../../components/mobile-more-drawer/mobile-more-drawer.component";
import {classes} from "../../pipes/classes.pipe";
import {usePage} from "../../hooks/page.hook";
import {footerTypes} from "../../enums/footer-types";
import {Routes} from "../../enums/routes.enum";

type MenuItemType = { Icon: React.ComponentType; title: string; className: string, url?: string, onClick?: () => void }
const MobileFooter = () => {
    const {t} = useTranslation();
    const [logDrawerOpen, setLogDrawerOpen] = useState(false);
    const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);
    const location = useLocation();
    const {id} = useParams<any>();
    const page = usePage();
    const footerType = useMemo(() =>  page?.footer === undefined ?  footerTypes.DEFAULT : page?.footer, [page]);
    const menuItemsOptions: {[key:string]:MenuItemType[]} = {
        [footerTypes.DEFAULT]: [
            {Icon: HomeIcon, title: 'home', className: 'mobile-footer__item', url: Routes.HOME},
            {Icon: PlanIcon, title: 'plans', className: 'mobile-footer__item', url: Routes.PLANS},
            {Icon: AddIcon, title: 'log', className: 'mobile-footer__add', onClick: () => setLogDrawerOpen(true)},
            {Icon: ProgressIcon, title: 'progress', className: 'mobile-footer__item', url: Routes.PROGRESS},
            {Icon: MoreIcon, title: 'more', className: 'mobile-footer__item', onClick: () => setMoreDrawerOpen(true)},
        ],
        [footerTypes.TRAINER]: [
            {Icon: HubIcon, title: 'hub', className: 'mobile-footer__item', url: `${Routes.CLIENTS}/${id}${Routes.HUB}`},
            {Icon: AddIcon, title: 'log', className: 'mobile-footer__add', onClick: () => setLogDrawerOpen(true)},
            {Icon: ProfileIcon, title: 'profile', className: 'mobile-footer__item', url: `${Routes.CLIENTS}/${id}${Routes.PROFILE}`},
        ]
    };
    const menuItems: MenuItemType[] = useMemo(() =>menuItemsOptions[footerType], [footerType]);
    return (
        <Styles>
            <div className={'mobile-footer__cont'}>
                {
                    menuItems.map(({title, className, Icon, url, onClick}) => {
                        const child = (
                            <div>
                                <Icon/>
                                <span className={'mobile-footer__label'}>{t(`menu.${title}`)}</span>
                            </div>
                        );
                        return url ? (<Link key={title} to={url} className={
                                classes(className, location.pathname === url && 'mobile-footer__item__active')
                        }>{child}</Link>)
                            : (<div key={title} className={className} onClick={onClick}>{child}</div>)
                    })
                }
            </div>
            <MobileLogDrawer isOpen={logDrawerOpen} onClose={() => setLogDrawerOpen(false)}/>
            <MobileMoreDrawer isOpen={moreDrawerOpen} onClose={() => setMoreDrawerOpen(false)}/>
        </Styles>
    );
};

export default MobileFooter;
