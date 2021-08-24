import React, { useEffect, useState } from 'react'

import api from '../../../../managers/api.manager'
import { noImage } from '../../../../pipes/no-image.pipe'
import Styles, { ProfileImageStyled, Text } from './session-user-avatar.styles'

interface Props {
  avatar?: { url: string } | null
  first_name?: string
  last_name?: string
  size?: 'sm'
}

const SessionUserAvatar: React.FC<Props> = (props) => {
  const { avatar, first_name = '', last_name = '', size } = props
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (avatar?.url) {
      const checkUrl = async () => {
        try {
          await api.get(avatar.url)
          setUrl(avatar.url)
        } catch (e) {
          console.log(e)
        }
      }

      checkUrl()
    }
  }, [])

  return (
    <Styles>
      <ProfileImageStyled
        $size={size}
        url={url}
        placeholder={noImage(first_name, last_name)}
      />
      <Text>
        {first_name} {last_name}
      </Text>
    </Styles>
  )
}

export default SessionUserAvatar
