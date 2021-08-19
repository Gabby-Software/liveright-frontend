import React, { FC } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import { chatTime } from '../../../../modules/chat/pipes/chat-time.pipe'
import { ChatRoomType } from '../../../../modules/chat/types/chat-room.type'
import { classes } from '../../../../pipes/classes.pipe'
import { noImage } from '../../../../pipes/no-image.pipe'
import Styles, { AvatarStyled } from './chat-room.styles'

type Props = {
  room: ChatRoomType
}
const ChatRoom: FC<Props> = ({ room }) => {
  return (
    <Styles
      className={classes(room.unread_count && 'chat-room__unread')}
      to={Routes.CHAT + `/${room.room_id}`}
    >
      <div className={'chat-room__left'}>
        <AvatarStyled
          url={room.avatar}
          placeholder={noImage(room.first_name, room.last_name)}
        />
      </div>
      <div className={'chat-room__center'}>
        <div className={'chat-room__name'}>
          {room.first_name} {room.last_name}
        </div>
        <div className={'chat-room__message'}>
          <span>{room.last_message}</span>
        </div>
      </div>
      <div className={'chat-room__right'}>
        <div className={'chat-room__date'}>
          {chatTime(room.last_message_date)}
        </div>
        {room.unread_count ? (
          <div className={'chat-room__unreads'}>{room.unread_count}</div>
        ) : null}
      </div>
    </Styles>
  )
}

export default ChatRoom
