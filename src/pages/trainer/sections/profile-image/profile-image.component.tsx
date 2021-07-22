import React, {useState, useEffect} from 'react';
import Styles from './profile-image.styles';
import {noImage} from "../../../../pipes/no-image.pipe";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import FormImageUpload from "../../../../components/forms/form-image-upload/form-image-upload.component";
import ProfileImage from "../../../../components/profile-image/profile-image.component";
import {useTrainer} from "../../../../hooks/trainer.hook";

const ProfileImageSection = () => {
    const {first_name, last_name, avatar} = useTrainer();
    const {t} = useTranslation();
    return (
        <Styles>
            <ProfileImage url={avatar?.url || ''} placeholder={noImage(first_name, last_name)}/>
        </Styles>
    )
};

export default ProfileImageSection;
