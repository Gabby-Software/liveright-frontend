import React from 'react'
import { useParams } from 'react-router'
import { Redirect } from 'react-router-dom'

import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import { useAuth } from '../../hooks/auth.hook'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useChats } from '../../modules/chat/contexts/chats.context'
import Styles from './chat.styles'
import ChatMessages from './layouts/chat-messages/chat-messages.component'
import ChatRooms from './layouts/chat-rooms/chat-rooms.component'
import ChatTrainer from './layouts/chat-trainer/chat-trainer.component'

const Chat = () => {
  const { type } = useAuth()
  const isMobile = useIsMobile()
  const { rooms } = useChats()
  const { room } = useParams<{ room?: string }>()
  if (type !== userTypes.CLIENT && room && !rooms[room])
    return <Redirect to={Routes.CHAT} />
  if (type === userTypes.CLIENT && !room) {
    const trainerRoom = Object.keys(rooms)[0]
    if (rooms[trainerRoom])
      return <Redirect to={Routes.CHAT + `/${trainerRoom}`} />
    else return null
  }

  if (isMobile) {
    if (!room) {
      return (
        <MobilePage
          color="secondary"
          title="Chat"
          headerNavChat
          headerSpacing={10}
        >
          <ChatRooms />
        </MobilePage>
      )
    }
    return <ChatMessages room={room} />
  }

  return (
    <Styles>
      {type === userTypes.CLIENT ? <ChatTrainer /> : <ChatRooms />}
      <ChatMessages room={room || ''} />
    </Styles>
  )
}

export default Chat
