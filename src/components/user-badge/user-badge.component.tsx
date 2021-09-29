import React from 'react'

import { noImage } from '../../pipes/no-image.pipe'
import Image from '../image/image.component'
import { Styles, Text } from './user-badge.styles'

interface UserBadgeProps {
  avatar?: string
  firstName?: string
  lastName?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  avatarOnly?: boolean
  square?: boolean
  text?: 'semi-bold'
  online?: boolean
  unreadCount?: number
}

export default function UserBadge({
  avatar,
  firstName = '',
  lastName = '',
  size,
  className,
  avatarOnly,
  square,
  text,
  online,
  unreadCount
}: UserBadgeProps) {
  return (
    <Styles
      className={className}
      $size={size}
      $square={square}
      $online={online}
      $unread={unreadCount}
    >
      <div className="user-badge__preview">
        {!!unreadCount && (
          <span className="user-badge__unread">{unreadCount}</span>
        )}
        <Image src={avatar} />
        <span>{noImage(firstName, lastName)}</span>
      </div>
      {!avatarOnly && (
        <Text className="user-badge__text" $size={size} $weight={text}>
          {firstName} {lastName}
        </Text>
      )}
    </Styles>
  )
}
