import React, { useEffect, useState } from 'react'

import api from '../../managers/api.manager'
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
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (avatar) {
      const checkUrl = async () => {
        try {
          await api.get(avatar)
          setUrl(avatar)
        } catch (e) {
          console.log(e)
        }
      }

      checkUrl()
    }
  }, [])

  return (
    <Styles className={className}>
      <ProfileImageStyled
        $size={size}
        url={url}
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
