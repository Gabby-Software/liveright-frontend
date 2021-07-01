import React, {useState, useEffect} from 'react';
import Styles from './profile-data.styles';
import {ReactComponent as EmailIcon} from "../../../../assets/media/icons/email.svg";
import {ReactComponent as PhoneIcon} from "../../../../assets/media/icons/phone.svg";
import Card from "../../../../components/card/card.style";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/reducers";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useProfile} from "../../../../hooks/profile.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import {date} from "../../../../pipes/date.pipe";

const ProfileData = () => {
    const { phone_number} = useProfile();
    const {created_at, birthday, email} = useAuth();
    const {t} = useTranslation();
    return (
        <Styles>
            <Card className={'profile-data__dates'}>
                <div className={'profile-data__date'}>{t('profile:joined')} {date(created_at)}</div>
                {birthday ?<div className={'profile-data__date'}>{t('profile:born')} {birthday}</div>:null}
            </Card>
            <Card className={'profile-data__value'}>
                <EmailIcon/>
                <span>{email}</span>
            </Card>
            <Card className={'profile-data__value'}>
                <PhoneIcon/>
                <span>{phone_number}</span>
            </Card>
        </Styles>
    );
};

export default ProfileData;
