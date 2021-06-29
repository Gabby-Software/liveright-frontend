import React, {useState, useEffect} from 'react';
import Styles from './switch-account-modal-header.styles';
import logoCompact from '../../../assets/media/logo-compact.png';

type Props  = {title: string};
const SwitchAccountModalHeader = ({title}: Props) => {
    return (
        <Styles>
            <img className={'swa-header__img'} src={logoCompact}/>
            <h1 className={'swa-header__title'}>{title}</h1>
        </Styles>
    );
};

export default SwitchAccountModalHeader;
