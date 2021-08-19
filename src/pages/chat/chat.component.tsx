import React from 'react'
import { useParams } from 'react-router'
import { Redirect } from 'react-router-dom'

import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import { useAuth } from '../../hooks/auth.hook'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import Styles from './chat.styles'
import ChatMessages from './layouts/chat-messages/chat-messages.component'
import ChatRooms from './layouts/chat-rooms/chat-rooms.component'

const Chat = () => {
  const { type } = useAuth()
  const isMobile = useIsMobile()
  const { room } = useParams<{ room?: string }>()
  if (type === userTypes.CLIENT && !room) {
    return <Redirect to={Routes.CHAT + '/jdskjawcakj'} />
  }
  if (isMobile) {
    return room ? <ChatMessages /> : <ChatRooms />
  }
  return (
    <Styles>
      <ChatRooms />
      <ChatMessages />
    </Styles>
  )
}

export default Chat
