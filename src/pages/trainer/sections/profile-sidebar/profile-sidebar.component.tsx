import React from 'react'

import { Logo } from '../../../auth/styles'
import Styles, { PSpace, PSubtitle, PTitle } from './profile-sidebar.styles'

const ProfileSidebar = () => {
  return (
    <Styles>
      <Logo className={'sidebar__logo'} />
      <div className={'sidebar__body'}>
        <PTitle>My Trainer</PTitle>
        <PSpace />
        <PSubtitle>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          asperiores beatae dolores!
        </PSubtitle>
      </div>
    </Styles>
  )
}

export default ProfileSidebar
