import React, {useState, useEffect, useContext} from 'react';
import Styles from './profile-info.styles';
import {lrClientFields, lrTrainerFields, profileInfo} from "../../trainer.data";
import ProfileTitle from "../../components/profile-title/profile-title.component";
import ProfileField from "../../components/profile-field/profile-field.component";
import FormRow from "../../../../components/forms/form-row/form-row.component";
import {useTrainer} from "../../../../hooks/trainer.hook";
import {useAuth} from "../../../../hooks/auth.hook";
import userTypes from "../../../../enums/user-types.enum";
import {TrainerContext} from "../../trainer.context";
import FormTextarea from "../../../../components/forms/form-textarea/form-textarea.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";

const ProfileInfo = ({title}: {title:string}) => {
    const {type} = useAuth();
    const {editMode} = useContext(TrainerContext);
    const fields = type === userTypes.CLIENT ? lrTrainerFields : lrClientFields;
    const {t} = useTranslation();
    // const trainer = useTrainer();
    // if(!fields.some(f => (trainer as any)[f.name as string])) return null;
    return (
        <Styles>
            <ProfileTitle title={title}/>
            <FormRow>
            {
                    fields.map(p => editMode? (
                        <FormTextarea name={p.name as string} label={t(p.label as string)}/>
                    ) : (<ProfileField {...p}/>))
            }
            </FormRow>
        </Styles>
    )
};

export default ProfileInfo;
