import React from 'react'

import UserBadge from '../../../../../../components/user-badge/user-badge.component'
import { FileType } from '../../../../../../types/file.type'
import Styles from './user-details-card.styles'

interface IProps {
  avatar: FileType | null
  firstName: string
  lastName: string
}

const UserDetailsCard = ({ avatar, firstName, lastName }: IProps) => {
  return (
    <Styles className="card">
      <UserBadge
        avatarOnly
        square
        size="xl"
        avatar={avatar?.url}
        firstName={firstName}
        lastName={lastName}
        className="card__avatar"
      />
      <p className="card__name">
        {firstName} {lastName}
      </p>
    </Styles>
  )
}

export default UserDetailsCard
