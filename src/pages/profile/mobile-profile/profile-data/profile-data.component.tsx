import React, {useState, useEffect} from 'react';
import Styles from './profile-data.styles';
import {ReactComponent as EmailIcon} from "../../../../assets/media/icons/email.svg";
import {ReactComponent as PhoneIcon} from "../../../../assets/media/icons/phone.svg";
import Card from "../../../../components/card/card.style";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/reducers";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";

const ProfileData = () => {
    const {join_date, birth_date, email, phone} = useSelector((state: RootState) => state.account);
    const {t} = useTranslation();
    return (
        <Styles>
            <Card className={'profile-data__dates'}>
                <div className={'profile-data__date'}>{t('profile:joined')} {join_date}</div>
                <div className={'profile-data__date'}>{t('profile:born')} {birth_date}</div>
            </Card>
            <Card className={'profile-data__value'}>
                <EmailIcon/>
                <span>{email}</span>
            </Card>
            <Card className={'profile-data__value'}>
                <PhoneIcon/>
                <span>{phone}</span>
            </Card>
        </Styles>
    );
};

export default ProfileData;
