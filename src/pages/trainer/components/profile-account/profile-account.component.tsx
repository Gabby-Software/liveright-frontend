import React, {useState, useEffect} from 'react';
import Styles from './profile-account.styles';
import {classes} from "../../../../pipes/classes.pipe";
import {noImage} from "../../../../pipes/no-image.pipe";
import {capitalize} from "../../../../pipes/capitalize.pipe";

type Prop = {
    type: string;
    active?: boolean;
    className?: string;
    noRadio?: boolean;
    onClick?: () => void;
    disabled?: boolean;
};
const ProfileAccount = ({type, active, className, noRadio, onClick, disabled}: Prop) => {
    return (
        <Styles className={classes(className, active && 'account__active', disabled && 'account__disabled')} onClick={onClick}>
            {
                noRadio ? null : (
                    <div className={classes('account__radio', active && 'account__radio__active')}/>
                )
            }
            <div className={'account__data'}>
                <div className={'account__type'}>{capitalize(type)}</div>
            </div>
        </Styles>
    );
};

export default ProfileAccount;
