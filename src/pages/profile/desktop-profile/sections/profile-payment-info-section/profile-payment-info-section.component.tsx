import React, {useState, useEffect} from 'react';
import Styles from './profile-payment-info-section.styles';
import {useProfile} from "../../../../../hooks/profile.hook";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import ProfileField from "../../../../../components/profile/profile-field/profile-field.component";

const ProfilePaymentInfoSection = () => {
    const {payment_info} = useProfile();
    const {t} = useTranslation();
    return (
        <Styles>
            <ProfileTitle title={t('profile:payment-info.title')}/>
            <div className={'profile-payment__cont'}>
                <ProfileField name={t('profile:payment-info.bank')} value={payment_info.bank} formName={'payment_info.bank'}/>
                <ProfileField name={t('profile:payment-info.branch-name')} value={payment_info.branch_name} formName={'payment_info.branch_name'}/>
                <ProfileField name={t('profile:payment-info.name-on-account')} value={payment_info.name_on_account} formName={'payment_info.name_on_account'}/>
                <ProfileField name={t('profile:payment-info.account-number')} value={payment_info.account_number} formName={'payment_info.account_number'}/>
            </div>
        </Styles>
    )
};

export default ProfilePaymentInfoSection;
