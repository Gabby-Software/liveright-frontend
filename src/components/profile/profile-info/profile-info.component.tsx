import React, {useState, useEffect, useContext} from 'react';
import Styles from './profile-info.styles';
import {ProfileContext} from "../../../pages/profile/desktop-profile/profile.context";
import FormTextarea from "../../forms/form-textarea/form-textarea.component";

type Prop = {
    formName:string;
    name: string;
    value: string;
}
const ProfileInfo = ({name, value, formName}: Prop) => {
    const {editMode} = useContext(ProfileContext);
    return (
        <Styles>
            {
                editMode ? (
                    <FormTextarea name={formName} label={name}/>
                ) : (
                    <>
                        <div className={'info__name'}>{name}</div>
                        <div className={'info__value'}>{value}</div>
                    </>
                )
            }
        </Styles>
    )
};

export default ProfileInfo;
