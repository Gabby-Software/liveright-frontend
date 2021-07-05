import React, {useState, useEffect, useMemo} from 'react';
import Styles from './profile-info-section.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/reducers";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import ProfileInfo from "../../../../../components/profile/profile-info/profile-info.component";
import {useProfile} from "../../../../../hooks/profile.hook";
import {useAuth} from "../../../../../hooks/auth.hook";
import userTypes from "../../../../../enums/user-types.enum";
import {OptionType} from "../../../../../types/option.type";

const ProfileInfoSection = () => {
    const {dietary_restrictions, injuries, about, qualifications, additional_information} = useProfile();
    const {type} = useAuth();
    const {t} = useTranslation();
    const items: {name: string, value: string, formName: string}[] = useMemo(() => type === userTypes.CLIENT ? [
        {name: t('profile:dietary-restrictions'), value: dietary_restrictions,formName: 'dietary_restrictions'},
        {name: t('profile:injuries'), value: injuries, formName: 'injuries'},
    ] : [
        {name: t('profile:about'), value: about, formName: 'about'},
        {name: t('profile:qualifications'), value: qualifications,formName:'qualifications'},
        {name: t('profile:additional-information'), value: additional_information,formName:'additional_information'},
    ], [type,dietary_restrictions, injuries, about, qualifications, additional_information]);
    return (
        <Styles>
            <ProfileTitle title={t('profile:user-info')}/>
            <div className={'profile-info__cont'}>
                {
                    items.map(t => <ProfileInfo {...t}/>)
                }
            </div>
        </Styles>
    )
};

export default ProfileInfoSection;
