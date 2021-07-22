import React, {useState, useEffect} from 'react';
import Styles from './profile-info.styles';
import {profileInfo} from "../../trainer.data";
import ProfileTitle from "../../components/profile-title/profile-title.component";
import ProfileField from "../../components/profile-field/profile-field.component";
import FormRow from "../../../../components/forms/form-row/form-row.component";
import {useTrainer} from "../../../../hooks/trainer.hook";

const ProfileInfo = () => {
    const fields = profileInfo;
    const trainer = useTrainer();
    if(!fields.some(f => (trainer as any)[f.name as string])) return null;
    return (
        <Styles>
            <ProfileTitle title={'Trainer Info'}/>
            <FormRow>
            {
                fields.map(p => <ProfileField {...p}/>)
            }
            </FormRow>
        </Styles>
    )
};

export default ProfileInfo;
