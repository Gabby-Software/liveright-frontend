import React, {useState, useEffect} from 'react';
import StyledModal from './modal.styles';
import {ModalProps} from "antd";
import {ReactComponent as TimesIcon} from "../../assets/media/icons/times.svg";

const Modal = ({children, visible, onCancel}: ModalProps & {children:React.ReactNode}) => {
    return (
        <StyledModal visible={visible} onCancel={onCancel}
                     footer={null} closeIcon={<TimesIcon className={'modal__times'}/>}>
            {children}
        </StyledModal>
    );
};

export default Modal;
