import React, {useState, useEffect} from 'react';
import Styles from './profile-account.styles';
import {classes} from "../../../pipes/classes.pipe";
import {noImage} from "../../../pipes/no-image.pipe";

type Prop = {
    first_name: string;
    last_name: string;
    type: string;
    image: string;
    active?: boolean;
    className?: string;
    noRadio?: boolean;
    onClick?: () => void;
};
const ProfileAccount = ({first_name, last_name, type, image, active, className, noRadio, onClick}: Prop) => {
    return (
        <Styles className={classes(className, active && 'account__active')} onClick={onClick}>
            {
                noRadio ? null : (
                    <div className={classes('account__radio', active && 'account__radio__active')}/>
                )
            }
            {
                image? (
                    <img className={classes('account__img', active && 'account__img__active')}
                         src={image} alt={'account'}/>
                ):(
                    <div className={'account__img account__placeholder'}>{noImage(first_name, last_name)}</div>
                )
            }
            <div className={'account__data'}>
                <div className={'account__name'}>{first_name} {last_name}</div>
                <div className={'account__type'}>{type}</div>
            </div>
        </Styles>
    );
};

export default ProfileAccount;
