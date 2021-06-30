import React, {useState, useEffect} from 'react';
import Styles from './profile-info-section.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/reducers";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import ProfileInfo from "../../../../../components/profile/profile-info/profile-info.component";

const ProfileInfoSection = () => {
    const {dietary_restrictions, injuries} = useSelector((state: RootState) => state.account);
    const {t} = useTranslation();
    return (
        <Styles>
            <ProfileTitle title={t('profile:user-info')}/>
            <div className={'profile-info__cont'}>
                <ProfileInfo name={t('profile:dietary-restrictions')} value={dietary_restrictions} formName={'dietary_restrictions'}/>
                <ProfileInfo name={t('profile:injuries')} value={injuries} formName={'injuries'}/>
            </div>
        </Styles>
    )
};

export default ProfileInfoSection;
