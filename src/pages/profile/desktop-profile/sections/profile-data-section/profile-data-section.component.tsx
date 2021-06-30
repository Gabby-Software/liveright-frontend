import React, {useState, useEffect, useContext} from 'react';
import Styles from './profile-data-section.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/reducers";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import FormButton from "../../../../../components/forms/form-button/form-button.component";
import ProfileField from "../../../../../components/profile/profile-field/profile-field.component";
import {ProfileContext} from "../../profile.context";
import ButtonSubmit from "../../../../../components/forms/button-submit/button-submit.component";
import ButtonCancel from "../../../../../components/forms/button-cancel/button-cancel.component";

type dataItemType = {
    name: string;
    value: string;
    formName: string;
    editable: boolean;
    type?: string;
};
const ProfileDataSection = () => {
    const profileData = useSelector((state: RootState) => state.account);
    const {editMode, setEditMode} = useContext(ProfileContext); 
    const {t} = useTranslation();
    const dataItems: dataItemType[] = [
        {name: t('profile:first-name'), value: profileData.first_name, formName: 'first_name', editable: true},
        {name: t('profile:last-name'), value: profileData.last_name, formName:'last_name', editable: true},
        {name: t('profile:birth-date'), value: profileData.birth_date, formName:'birth_date', editable: true, type: 'date'},
        {name: t('profile:email'), value: profileData.email, formName: 'email', editable: true},
        {name: t('profile:phone'), value: profileData.phone, formName: 'phone', editable: true},
        {name: t('profile:address'), value: profileData.address, formName: 'address', editable: true},
        {name: t('profile:join-date'), value: profileData.join_date, formName: 'join_date', type:'date', editable: false},
        {name: t('profile:gender'), value: profileData.gender, formName: 'gender', editable: true, type: 'radio'},
    ];
    return (
        <Styles>
            <ProfileTitle title={t('profile:personal-profile')}>
                {
                    editMode ? (
                        <>
                            <ButtonCancel className={'profile-data__cta'}
                                onCancel={() => setEditMode(false)}>{t('profile:cancel')}</ButtonCancel>
                            <ButtonSubmit className={'profile-data__cta'}>{t('profile:save-changes')}</ButtonSubmit>
                        </>

                    ) : (
                        <FormButton type={'primary'} className={'profile-data__cta'}
                                    onClick={() => setEditMode(true)}>{t('profile:edit-details')}</FormButton>       
                    )
                }
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
