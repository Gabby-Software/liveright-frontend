import React, {useState, useEffect, useContext} from 'react';
import Styles from './profile-tnb-section.styles';
import ProfileTitle from "../../../../../components/profile/profile-title/profile-title.component";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {useProfile} from "../../../../../hooks/profile.hook";
import {ReactComponent as DownloadIcon} from "../../../../../assets/media/icons/download.svg";
import {ProfileContext} from "../../profile.context";
import {excerpt} from "../../../../../pipes/excerpt.pipe";
import fileManager from "../../../../../managers/file.manager";
import FormFileUpload from "../../../../../components/forms/form-file-upload/form-file-upload.component";
import {FileType} from "../../../../../types/file.type";

const ProfileTnbSection = ({tnb}:{tnb: FileType}) => {
    const {t} = useTranslation();
    const {editMode, setTnbFile} = useContext(ProfileContext);
    return (
        <Styles>
            <ProfileTitle title={t('profile:tnb')}/>
            {
                editMode ? (
                    <FormFileUpload name={'tnb.url'} onUpdate={setTnbFile} initialFilename={tnb?.name?`${tnb.name}.${tnb.ext}`:undefined}/>
                ) : (
                    <div className={'profile-tnb__view'}>
                        {
                            tnb.url ? (
                                <>
                                    <span>{excerpt(`${tnb.name}.${tnb.ext}`, 32)}</span>
                                    <DownloadIcon onClick={() => fileManager.downloadUrl(tnb.url, `${tnb.name}.${tnb.ext}`)}/>
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
