import React from 'react'

import { noImage } from '../../pipes/no-image.pipe'
import Styles, { ProfileImageStyled, Text } from './user-badge.styles'

interface UserBadgeProps {
  avatar?: string
  firstName?: string
  lastName?: string
  size?: 'sm'
  className?: string
  avatarOnly?: boolean
}

export default function UserBadge({
  avatar,
  firstName = '',
  lastName = '',
  size,
  className,
  avatarOnly
}: UserBadgeProps) {
  return (
    <Styles className={className}>
      <ProfileImageStyled
        $size={size}
        url={avatar}
        placeholder={noImage(firstName, lastName)}
        className="user-badge__preview"
      />
      {!avatarOnly && (
        <Text className="user-badge__text">
          {firstName} {lastName}
        </Text>
      )}
    </Styles>
  )
}
