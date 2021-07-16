import React, {useContext} from 'react';
import Styles from './profile-tnb-section.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {ReactComponent as DownloadIcon} from "../../../../../assets/media/icons/download.svg";
import {ProfileContext} from "../../profile.context";
import {excerpt} from "../../../../../pipes/excerpt.pipe";
import fileManager from "../../../../../managers/file.manager";
import FormFileUpload from "../../../../../components/forms/form-file-upload/form-file-upload.component";
import {FileType} from "../../../../../types/file.type";
import logger from "../../../../../managers/logger.manager";

const ProfileTnbSection = ({tnb}:{tnb: FileType|null}) => {
    const {t} = useTranslation();
    const {editMode, setTnbFile} = useContext(ProfileContext);
    return (
        <Styles>
            <ProfileTitle title={t('profile:tnb')}/>
            {
                editMode ? (
                    <FormFileUpload name={'terms_and_conditions.url'} onUpdate={setTnbFile} initialFilename={tnb?.file_name||undefined}/>
                ) : (
                    <div className={'profile-tnb__view'}>
                        {
                            tnb?.url ? (
                                <>
                                    <span>{excerpt(tnb.file_name, 32)}</span>
                                    <DownloadIcon onClick={() => fileManager.downloadUrl(tnb.url, tnb.file_name)}/>
                                </>
                            ) : (<span>{t('no-data')}</span>)
                        }
                    </div>
                )
            }
        </Styles>
    )
};

export default ProfileTnbSection;
