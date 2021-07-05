import React, {useState, useEffect, useContext} from 'react';
import Styles from './profile-info.styles';
import {ProfileContext} from "../../../pages/profile/desktop-profile/profile.context";
import FormTextarea from "../../forms/form-textarea/form-textarea.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";

type Prop = {
    formName:string;
    name: string;
    value: string;
}
const ProfileInfo = ({name, value, formName}: Prop) => {
    const {editMode} = useContext(ProfileContext);
    const {t} = useTranslation();
    return (
        <Styles>
            {
                editMode ? (
                    <FormTextarea name={formName} label={name}/>
                ) : (
                    <>
                        <div className={'info__name'}>{name || t('no-data')}</div>
                        <div className={'info__value'}>{value}</div>
                    </>
                )
            }
        </Styles>
    )
};

export default ProfileInfo;
