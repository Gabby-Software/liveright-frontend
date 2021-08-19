import React from 'react'

import ProfileImage from '../../../../components/profile-image/profile-image.component'
import { useTrainer } from '../../../../hooks/trainer.hook'
import { noImage } from '../../../../pipes/no-image.pipe'
import Styles from './profile-image.styles'

const ProfileImageSection = () => {
  const { first_name, last_name, avatar } = useTrainer()
  return (
    <Styles>
      <ProfileImage
        url={avatar?.url || ''}
        placeholder={noImage(first_name, last_name)}
      />
    </Styles>
  )
}

export default ProfileImageSection
