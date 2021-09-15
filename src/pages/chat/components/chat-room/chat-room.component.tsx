import React, { FC } from 'react'
import { useParams } from 'react-router'

import UserBadge from '../../../../components/user-badge/user-badge.component'
import { Routes } from '../../../../enums/routes.enum'
import { chatTime } from '../../../../modules/chat/pipes/chat-time.pipe'
import { lastMessage } from '../../../../modules/chat/pipes/last-message.pipe'
import { ChatRoomType } from '../../../../modules/chat/types/chat-room.type'
import { classes } from '../../../../pipes/classes.pipe'
import Styles from './chat-room.styles'

type Props = {
  room: ChatRoomType
  online?: boolean
}
const ChatRoom: FC<Props> = ({ room, online }) => {
  const { room: roomId } = useParams<{ room?: string }>()
  return (
    <Styles
      className={classes(
        room.unReadMessagesCount && 'chat-room__unread',
        room.roomId === roomId && 'chat-room__active'
      )}
      to={Routes.CHAT + `/${room.roomId}`}
    >
      <div className={'chat-room__left'}>
        <UserBadge
          size="md"
          firstName={room.firstName}
          lastName={room.lastName}
          avatar={room.avatar?.url}
          avatarOnly
          online={online}
        />
      </div>
      <div className={'chat-room__center'}>
        <div className={'chat-room__name'}>
          {room.firstName} {room.lastName}
        </div>
        <div className={'chat-room__message'}>
          <span>{lastMessage(room.lastMessage)}</span>
        </div>
      </div>
      <div className={'chat-room__right'}>
        <div className={'chat-room__date'}>
          {chatTime(room.lastMessage?.meta.sent_at)}
        </div>
        {room.unReadMessagesCount ? (
          <div className={'chat-room__unreads'}>
            <span>{room.unReadMessagesCount}</span>
          </div>
        ) : null}
      </div>
    </Styles>
  )
}

export default ChatRoom
