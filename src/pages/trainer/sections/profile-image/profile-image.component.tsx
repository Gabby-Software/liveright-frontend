import React from 'react'

import ProfileImage from '../../../../components/profile-image/profile-image.component'
import useTrainerAccount from '../../../../hooks/api/accounts/useTrainerAccount'
import { noImage } from '../../../../pipes/no-image.pipe'
import Styles from './profile-image.styles'

const ProfileImageSection = () => {
  const { user } = useTrainerAccount()
  return (
    <Styles>
      <ProfileImage
        url={user.avatar?.url || ''}
        placeholder={noImage(user.first_name, user.last_name)}
      />
    </Styles>
  )
}

export default ProfileImageSection
