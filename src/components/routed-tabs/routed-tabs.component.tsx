import React, {useState, useEffect, useRef, useMemo} from 'react';
import Styles from './routed-tabs.styles';
import {MenuItemType} from "../../types/menu-item.type";
import {Link, useLocation} from 'react-router-dom';
import {classes} from "../../pipes/classes.pipe";
import logger from "../../managers/logger.manager";

type Props = {
    tabs: MenuItemType[];
}
const RoutedTabs = ({tabs}: Props) => {
    const {pathname} = useLocation();
    const activeRef = useRef<HTMLDivElement>(null);
    const [[left, width], setIndicator] = useState([0, 0]);
    useEffect(() => {
        logger.info('UPDATING ACTIVE TAB', activeRef.current, activeRef.current?.offsetWidth, activeRef.current?.offsetLeft);
        if (!activeRef.current)
            setIndicator([0, 0]);
        else
            setIndicator([activeRef.current.offsetLeft, activeRef.current.offsetWidth]);
    }, [activeRef, pathname])
    logger.info('TAB DATA', left, width,{'--w': `${width}px`, '--l': `${left}px}`});
    return (
        <Styles className={'tabs'}>
            {
                tabs.map(({name, url}) => (
                    <div className={'tabs__item__wrapper'}
                         ref={pathname === url ? activeRef : null}>
                        <Link to={url || ''}
                              className={classes('tabs__item', pathname === url && 'tabs__item__active')}
                        >{name}</Link>
                    </div>
                ))
            }
            <div className={'tabs__indicator'}
                 style={{'--w': `${width}px`, '--l': `${left}px`} as any}
            />
        </Styles>
    );
};

export default RoutedTabs;
