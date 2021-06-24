import React, {useState, useEffect} from 'react';
import Styles from './profile-field.styles';

type Props = {
    name: string;
    value: string;
    editable?: boolean;
}
const ProfileField = ({name, value, editable}: Props) => {
    return (
        <Styles>
            <div className={'field__name'}>{name}</div>
            <div className={'field__value'}>{value}</div>
        </Styles>
    )
};

export default ProfileField;
