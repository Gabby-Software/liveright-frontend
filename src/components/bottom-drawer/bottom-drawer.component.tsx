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
    back?: boolean;
};
const BottomDrawer = ({children,title,isOpen,onClose,back}: Props) => {
    const ref = useRef(null);
    const {y} = useSwipe(ref,({y}) => y >= 50, onClose);
    return (
        <Drawer placement={'bottom'} onClose={onClose} className={'drawer-bottom'}
                style={{'--top': `-${Math.max(0,y)}px`} as any}
                visible={isOpen} closable={false} height={'auto'}>
                <div className={'drawer__header'} ref={ref}>
                    {
                        back?(
                            <ArrowIcon className={'drawer__back'} onClick={onClose}/>
                        ):null
                    }
                    <h3 className={'drawer__title'}>{title}</h3>
                </div>
                {children}
        </Drawer>
    )
};

export default BottomDrawer;
