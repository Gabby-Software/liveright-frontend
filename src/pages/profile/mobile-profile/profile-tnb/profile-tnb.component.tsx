import React, {useState, useEffect} from 'react';
import Styles from './profile-tnb.styles';
import {useProfile} from "../../../../hooks/profile.hook";
import {excerpt} from "../../../../pipes/excerpt.pipe";
import {ReactComponent as DownloadIcon} from "../../../../assets/media/icons/download.svg";
import fileManager from "../../../../managers/file.manager";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {FileType} from "../../../../types/file.type";

type ProfileTnbPropsType = {
    tnb: FileType|null
}
const ProfileTnb = ({tnb}:ProfileTnbPropsType) => {
    const {t} = useTranslation();
    return (
        <Styles>
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
        </Styles>
    );
};

export default ProfileTnb;
