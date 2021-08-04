import React, {useState, useEffect, useContext} from 'react';
import Styles from './profile-basic.styles';
import ProfileTitle from "../../components/profile-title/profile-title.component";
import {profileBasic} from "../../trainer.data";
import ProfileField from "../../components/profile-field/profile-field.component";
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {useTrainer} from "../../../../hooks/trainer.hook";
import {TrainerContext} from "../../trainer.context";
import ButtonSubmit from "../../../../components/forms/button-submit/button-submit.component";
import logger from "../../../../managers/logger.manager";

const ProfileBasic = ({title}:{title:string}) => {
    const {t} = useTranslation();
    const {editMode, setEditMode} = useContext(TrainerContext);
    return (
        <Styles>
            <ProfileTitle title={title}>
                {
                    editMode?(
                        <ButtonSubmit>{t('profile:save-changes')}</ButtonSubmit>
                    ):(
                        <FormButton type={'primary'} onClick={() => {
                            setEditMode(true)
                        }}>{t('profile:edit-details')}</FormButton>
                    )
                }
            </ProfileTitle>
            {
                profileBasic.map(p => <ProfileField {...p}/>)
            }
        </Styles>
    );
};

export default ProfileBasic;
