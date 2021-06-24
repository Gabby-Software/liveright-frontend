import React, {useState, useEffect} from 'react';
import Styles from './profile-account.styles';

type Prop = {
    name:string;
    type:string;
    image:string;
};
const ProfileAccount = ({name,type,image}: Prop) => {
    return (
        <Styles>
            <img className={'account__img'} src={image} alt={'account'}/>
            <div className={'account__data'}>
                <div className={'account__name'}>{name}</div>
                <div className={'account__type'}>{type}</div>
            </div>
        </Styles>
    );
};

export default ProfileAccount;
