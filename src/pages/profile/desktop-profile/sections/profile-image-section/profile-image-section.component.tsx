import React, {useState, useEffect, useContext} from 'react';
import Styles from './profile-image-section.styles';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store/reducers";
import ProfileImage from "../../../../../components/profile-image/profile-image.component";
import {noImage} from "../../../../../pipes/no-image.pipe";
import {ProfileContext} from "../../profile.context";
import FormImageUpload from "../../../../../components/forms/form-image-upload/form-image-upload.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {useAuth} from "../../../../../hooks/auth.hook";

const ProfileImageSection = () => {
    const {editMode} = useContext(ProfileContext);
    const {avatar_thumb, first_name, last_name} = useAuth();
    const [file, setFile] = useState<File|null>(null);
    const {t} = useTranslation();
    return (
        <Styles>
            {
                editMode ? (
                    <FormImageUpload name={'image'}
                                     label={'Change Profile Photo'}
                                     aspectRatio={1}
                                     onUpdate={({file}) => setFile(file)}>
                        {
                            ({url}) => (<ProfileImage url={url} placeholder={noImage(first_name, last_name)}/>)
                        }
                    </FormImageUpload>
                ) : (
                    <ProfileImage url={avatar_thumb} placeholder={noImage(first_name, last_name)}/>
                )
            }
        </Styles>
    )
};

export default ProfileImageSection;
