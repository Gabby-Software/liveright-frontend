import React, {useState, useEffect} from 'react';
import StyledModal from './modal.styles';
import {ModalProps} from "antd";
import {ReactComponent as TimesIcon} from "../../assets/media/icons/times.svg";
import styled from "styled-components";
import {classes} from "../../pipes/classes.pipe";

const Modal = ({children, visible, onCancel, large}: ModalProps & {children:React.ReactNode, large?: boolean}) => {
    return (
        <StyledModal visible={visible} onCancel={onCancel} className={classes(large && 'modal__large')}
                     footer={null} closeIcon={<TimesIcon className={'modal__times'}/>}>
            {children}
        </StyledModal>
    );
};
const Title = styled.h1`
        ${p => p.theme.extend.h1};
        margin: 80px 0 40px 0;
        color: ${p => p.theme.vars.colors.primaryDark};
`;
Modal.Title = Title;

export default Modal;
