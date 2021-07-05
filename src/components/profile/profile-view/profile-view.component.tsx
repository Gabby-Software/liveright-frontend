import React, {useState, useEffect} from 'react';
import Styles from './profile-view.styles';
import {useTranslation} from "../../../modules/i18n/i18n.hook";

type Props = {
    name:string;
    value: string;
    type?:string;
}
const ProfileView = ({name, value, type}:Props) => {
    const {t} = useTranslation();
    return (
        <Styles>
            <div className={'field__name'}>{name}</div>
            <div className={'field__value'}>{type==='radio'?t(`profile:${value}`):value}</div>
        </Styles>
    )
};

export default ProfileView;
