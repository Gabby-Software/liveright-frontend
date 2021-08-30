import React, { FC } from 'react'
import { useParams } from 'react-router'

import { Routes } from '../../../../enums/routes.enum'
import { chatTime } from '../../../../modules/chat/pipes/chat-time.pipe'
import { lastMessage } from '../../../../modules/chat/pipes/last-message.pipe'
import { ChatRoomType } from '../../../../modules/chat/types/chat-room.type'
import { classes } from '../../../../pipes/classes.pipe'
import { noImage } from '../../../../pipes/no-image.pipe'
import Styles, { AvatarStyled } from './chat-room.styles'

type Props = {
  room: ChatRoomType
}
const ChatRoom: FC<Props> = ({ room }) => {
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
        <AvatarStyled
          url={room.avatar?.url}
          placeholder={noImage(room.firstName, room.lastName)}
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
          {chatTime(room.lastMessage?.meta.delivered_at)}
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
