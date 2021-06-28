import React, {useState, useEffect, useRef} from 'react';
import Drawer from './bottom-drawer.styles';
import {ReactComponent as ArrowIcon} from '../../assets/media/icons/back-arrow.svg';
import {useSwipe} from "../../hooks/swipe.hook";
import logger from "../../managers/logger.manager";

type Props = {
    children: React.ReactNode,
    title: string;
    isOpen:boolean;
    onClose:()=>void;
};
const BottomDrawer = ({children,title,isOpen,onClose}: Props) => {
    const ref = useRef(null);
    const {y} = useSwipe(ref,({y}) => {
        logger.info('swipeY', y);
        if(y > 30) {onClose();}
    });
    return (
        <Drawer placement={'bottom'} onClose={onClose} className={'drawer-bottom'}
                style={{'--top': `${Math.max(0,y)}px`} as any}
                visible={isOpen} closable={false} height={'auto'}>
                <div className={'drawer__header'} ref={ref}>
                    <ArrowIcon className={'drawer__back'} onClick={onClose}/>
                    <h3 className={'drawer__title'}>{title}</h3>
                </div>
                {children}
        </Drawer>
    )
};

export default BottomDrawer;
