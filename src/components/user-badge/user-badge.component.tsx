import React, { useEffect, useState } from 'react'

import { noImage } from '../../pipes/no-image.pipe'
import { Styles, Text } from './user-badge.styles'

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
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (avatar) {
      setSrc(avatar)
    }
  }, [avatar])

  return (
    <Styles className={className} $size={size}>
      <div className="user-badge__preview">
        {src && <img src={src} onError={() => setSrc('')} alt="" />}
        <span>{noImage(firstName, lastName)}</span>
      </div>
      {!avatarOnly && (
        <Text className="user-badge__text">
          {firstName} {lastName}
        </Text>
      )}
    </Styles>
  )
}
