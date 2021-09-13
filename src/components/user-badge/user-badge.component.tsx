import React from 'react'

import { noImage } from '../../pipes/no-image.pipe'
import Image from '../image/image.component'
import { Styles, Text } from './user-badge.styles'

interface UserBadgeProps {
  avatar?: string
  firstName?: string
  lastName?: string
  size?: 'sm' | 'lg' | 'xl'
  className?: string
  avatarOnly?: boolean
  square?: boolean
  text?: 'semi-bold'
}

export default function UserBadge({
  avatar,
  firstName = '',
  lastName = '',
  size,
  className,
  avatarOnly,
  square,
  text
}: UserBadgeProps) {
  return (
    <Styles className={className} $size={size} $square={square}>
      <div className="user-badge__preview">
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
