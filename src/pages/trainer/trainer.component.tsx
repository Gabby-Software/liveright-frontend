import { Skeleton } from 'antd'
import React, { useState } from 'react'

import ProfileBody from '../../components/profile-components/profile-body.component'
import ProfileTnC from '../../components/profile-components/profile-tnc.component'
import { onlyClient } from '../../guards/client.guard'
import useTrainerAccount from '../../hooks/api/accounts/useTrainerAccount'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import ProfileAddresses from './sections/profile-addresses/profile-addresses.component'
import ProfileBasic from './sections/profile-basic/profile-basic.component'
import ProfileImage from './sections/profile-image/profile-image.component'
import ProfileInfo from './sections/profile-info/profile-info.component'
import ProfileTnb from './sections/profile-tnb/profile-tnb.component'
import Styles from './trainer.styles'

const TrainerContent = () => {
  const [edit, setEdit] = useState(false)
  const { isLoading, user, profile, address, error, account } =
    useTrainerAccount()
  const { t } = useTranslation()

  if (isLoading || error) {
    return <Skeleton />
  }

  return edit ? (
    <Styles className={'profile'}>
      <div className={'profile__main'}>
        <ProfileImage />
        <ProfileBasic title={'Basic Trainer Profile'} />
        <ProfileAddresses />
        <ProfileInfo title={'Trainer Info'} />
        <ProfileTnb />
      </div>
    </Styles>
  ) : (
    <ProfileBody
      user={user}
      profile={profile}
      address={address}
      account={account}
      setEdit={setEdit}
      mobileReturnText={t('profile:return-to-home')}
      mobileTitle={t('profile:trainer-title')}
    >
      <ProfileTnC profile={profile} />
    </ProfileBody>
  )
}

export default onlyClient(TrainerContent)
