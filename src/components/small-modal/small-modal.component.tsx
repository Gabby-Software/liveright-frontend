import React, {useState, useEffect} from 'react';
import StyledModal from './small-modal.styles';
import {ModalProps} from "antd";

const SmallModal = ({children, visible, title}: ModalProps & {children:React.ReactNode, title: string}) => {
    return (
        <StyledModal visible={visible} closable={false}>
            <div className={'small-modal__title'}>{title}</div>
            {children}
        </StyledModal>
    );
};

export default SmallModal;
