import React, {useState, useEffect} from 'react';
import Drawer from './bottom-drawer.styles';
import {ReactComponent as ArrowIcon} from '../../assets/media/icons/back-arrow.svg';

type Props = {
    children: React.ReactNode,
    title: string;
    isOpen:boolean;
    onClose:()=>void;
};
const BottomDrawer = ({children,title,isOpen,onClose}: Props) => {
    return (
        <Drawer placement={'bottom'} onClose={onClose}
                visible={isOpen} closable={false} height={'auto'}>
                <div className={'drawer__header'}>
                    <ArrowIcon className={'drawer__back'} onClick={onClose}/>
                    <h3 className={'drawer__title'}>{title}</h3>
                </div>
                {children}
        </Drawer>
    )
};

export default BottomDrawer;
