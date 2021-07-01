import React, {useState, useEffect} from 'react';
import Styles from './profile-account.styles';
import {classes} from "../../../pipes/classes.pipe";

type Prop = {
    name: string;
    type: string;
    image: string;
    active?: boolean;
    className?: string;
    noRadio?: boolean;
};
const ProfileAccount = ({name, type, image, active, className, noRadio}: Prop) => {
    return (
        <Styles className={classes(className, active && 'account__active')}>
            {
                noRadio ? null : (
                    <div className={classes('account__radio', active && 'account__radio__active')}/>
                )
            }
            <img className={classes('account__img', active && 'account__img__active')}
                 src={image} alt={'account'}/>
            <div className={'account__data'}>
                <div className={'account__name'}>{name}</div>
                <div className={'account__type'}>{type}</div>
            </div>
        </Styles>
    );
};

export default ProfileAccount;
