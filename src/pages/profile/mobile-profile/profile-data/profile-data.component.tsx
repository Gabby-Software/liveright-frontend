import React, {useState, useEffect} from 'react';
import Styles from './profile-data.styles';
import {ReactComponent as EmailIcon} from "../../../../assets/media/icons/email.svg";
import {ReactComponent as PhoneIcon} from "../../../../assets/media/icons/phone.svg";
import {ReactComponent as LocationIcon} from "../../../../assets/media/icons/location.svg";
import Card from "../../../../components/card/card.style";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {date} from "../../../../pipes/date.pipe";

type ProfileDataPropsType = {
    phone_number: string;
    created_at: string;
    birthday: string | null;
    email: string;
    address: string;
}
const ProfileData = ({phone_number, created_at, birthday, email, address}: ProfileDataPropsType) => {
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
            <Card className={'profile-data__value'}>
                <LocationIcon/>
                <span>{address}</span>
            </Card>
        </Styles>
    );
};

export default ProfileData;
