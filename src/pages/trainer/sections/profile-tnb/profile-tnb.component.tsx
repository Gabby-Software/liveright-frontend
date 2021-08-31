import React from 'react'

import { ReactComponent as DownloadIcon } from '../../../../assets/media/icons/download.svg'
import useTrainerAccount from '../../../../hooks/api/accounts/useTrainerAccount'
import fileManager from '../../../../managers/file.manager'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { excerpt } from '../../../../pipes/excerpt.pipe'
import ProfileTitle from '../../components/profile-title/profile-title.component'
import Styles from './profile-tnb.styles'

const ProfileTnb = () => {
  const { t } = useTranslation()
  const { profile } = useTrainerAccount()

  if (!profile.terms_and_conditions) return null

  return (
    <Styles>
      <ProfileTitle title={t('profile:tnb')} />
      {
        <div className={'profile-tnb__view'}>
          {profile.terms_and_conditions?.url ? (
            <>
              <span>{excerpt(profile.terms_and_conditions.file_name, 32)}</span>
              <DownloadIcon
                onClick={() =>
                  fileManager.downloadUrl(
                    profile.terms_and_conditions.url,
                    profile.terms_and_conditions.file_name
                  )
                }
              />
            </>
          ) : (
            <span>{t('no-data')}</span>
          )}
        </div>
      }
    </Styles>
  )
}

export default ProfileTnb
