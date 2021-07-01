import React, {useState, useEffect} from 'react';
import StyledModal from './small-modal.styles';
import {ModalProps} from "antd";
import {classes} from "../../pipes/classes.pipe";

type MenuItem = {
    name: string;
    onClick?: () => void;
    type?: 'primary'|'default';
    Wrap?: React.ComponentType<any>
};
type Props = ModalProps & {
    title: string;
    menu: MenuItem[];
};
const SmallModal = ({menu, visible, title,onCancel}: Props) => {
    return (
        <StyledModal visible={visible} closable={false} footer={null}
                        className={'small-modal'} onCancel={onCancel}>
            <div className={'small-modal__title'}>{title}</div>
            <ul className={'small-modal__body'}>
                {
                    menu.map(({name, onClick,type='default', Wrap = React.Fragment}) => (
                        <li className={classes('small-modal__item', `small-modal__item__${type}`)}
                            onClick={(e) => {onCancel && onCancel(e); onClick && onClick()}}>
                            <Wrap>{name}</Wrap>
                        </li>
                    ))
                }
            </ul>
        </StyledModal>
    );
};

export default SmallModal;
