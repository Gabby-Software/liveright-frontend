import React, {useState, useEffect} from 'react';
import Styles from './mobile-footer.styles';
import {ReactComponent as HomeIcon} from '../../assets/media/icons/home.svg';
import {ReactComponent as PlanIcon} from '../../assets/media/icons/plan.svg';
import {ReactComponent as ProgressIcon} from '../../assets/media/icons/progress.svg';
import {ReactComponent as MoreIcon} from '../../assets/media/icons/more.svg';
import {ReactComponent as AddIcon} from '../../assets/media/icons/add.svg';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {Link} from 'react-router-dom';
import MobileLogDrawer from "../../components/mobile-log-drawer/mobile-log-drawer.component";
import MobileMoreDrawer from "../../components/mobile-more-drawer/mobile-more-drawer.component";

type MenuItemType = { Icon: React.ComponentType; title: string; className: string, url?: string, onClick?: ()=>void }
const MobileFooter = () => {
    const {t} = useTranslation();
    const [logDrawerOpen, setLogDrawerOpen] = useState(false);
    const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);
    const menuItems: MenuItemType[] = [
        {Icon: HomeIcon, title: 'home', className: 'mobile-footer__item', url: '/'},
        {Icon: PlanIcon, title: 'plan', className: 'mobile-footer__item', url: '/plan'},
        {Icon: AddIcon, title: 'log', className: 'mobile-footer__add', onClick: () => setLogDrawerOpen(true)},
        {Icon: ProgressIcon, title: 'progress', className: 'mobile-footer__item', url: '/progress'},
        {Icon: MoreIcon, title: 'more', className: 'mobile-footer__item', onClick:() => setMoreDrawerOpen(true)},
    ];
    return (
        <Styles>
            <div className={'mobile-footer__cont'}>
                {
                    menuItems.map(({title, className, Icon, url, onClick}) => {
                        const child =(
                            <div>
                                <Icon/>
                                <span className={'mobile-footer__label'}>{t(title)}</span>
                            </div>
                        );
                        return url ? (<Link to={url} className={className}>{child}</Link>)
                            : (<div className={className} onClick={onClick}>{child}</div>)
                    })
                }
            </div>
           <MobileLogDrawer isOpen={logDrawerOpen} onClose={()=>setLogDrawerOpen(false)}/>
           <MobileMoreDrawer isOpen={moreDrawerOpen} onClose={()=>setMoreDrawerOpen(false)}/>
        </Styles>
    );
};

export default MobileFooter;
