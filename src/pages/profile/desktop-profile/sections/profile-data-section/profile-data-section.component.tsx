import React, {useState, useEffect} from 'react';
import Styles from './profile-data-section.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/reducers";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import FormButton from "../../../../../components/forms/form-button/form-button.component";
import ProfileField from "../../../../../components/profile/profile-field/profile-field.component";

type dataItemType = {
    name: string;
    value: string;
    editable: boolean;
};
const ProfileDataSection = () => {
    const profileData = useSelector((state: RootState) => state.account);
    const {t} = useTranslation();
    const dataItems: dataItemType[] = [
        {name: t('profile:first-name'), value: profileData.first_name, editable: true},
        {name: t('profile:last-name'), value: profileData.last_name, editable: true},
        {name: t('profile:join-date'), value: profileData.join_date, editable: false},
        {name: t('profile:email'), value: profileData.email, editable: true},
        {name: t('profile:phone'), value: profileData.phone, editable: true},
        {name: t('profile:address'), value: profileData.address, editable: true},
    ];
    return (
        <Styles>
            <ProfileTitle title={t('profile:personal-profile')}>
                <FormButton type={'primary'} className={'profile-data__cta'}>{t('profile:edit-details')}</FormButton>
            </ProfileTitle>
            <div className={'profile-data__cont'}>
                {
                    dataItems.map((item: dataItemType) => (
                        <ProfileField key={item.name} {...item}/>
                    ))
                }
            </div>
        </Styles>
    )
};

export default ProfileDataSection;
