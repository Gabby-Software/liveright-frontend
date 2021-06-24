import React, {useState, useEffect} from 'react';
import Styles from './profile-info.styles';

type Prop = {
    formName:string;
    name: string;
    value: string;
}
const ProfileInfo = ({name, value, formName}: Prop) => {
    return (
        <Styles>
            <div className={'info__name'}>{name}</div>
            <div className={'info__value'}>{value}</div>
        </Styles>
    )
};

export default ProfileInfo;
