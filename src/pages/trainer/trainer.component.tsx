import { Skeleton } from 'antd'
import React from 'react'

import { onlyClient } from '../../guards/client.guard'
import useTrainerAccount from '../../hooks/api/accounts/useTrainerAccount'
import ProfileAddresses from './sections/profile-addresses/profile-addresses.component'
import ProfileBasic from './sections/profile-basic/profile-basic.component'
import ProfileImage from './sections/profile-image/profile-image.component'
import ProfileInfo from './sections/profile-info/profile-info.component'
import ProfileTnb from './sections/profile-tnb/profile-tnb.component'
import Styles from './trainer.styles'

const TrainerContent = () => {
  const { isLoading, error } = useTrainerAccount()

  if (isLoading || error) {
    return <Skeleton />
  }

  return (
    <Styles className={'profile'}>
      <div className={'profile__main'}>
        <ProfileImage />
        <ProfileBasic title={'Basic Trainer Profile'} />
        <ProfileAddresses />
        <ProfileInfo title={'Trainer Info'} />
        <ProfileTnb />
      </div>
    </Styles>
  )
}

export default onlyClient(TrainerContent)
