import React, { FC, useState } from 'react'

import { ReactComponent as SearchIcon } from '../../../../assets/media/icons/search.svg'
import { FormInputUI } from '../../../../components/forms/form-input/form-input.component'
import { useChats } from '../../../../modules/chat/contexts/chats.context'
import { classes } from '../../../../pipes/classes.pipe'
import ChatRoom from '../../components/chat-room/chat-room.component'
import Styles from './chat-rooms.styles'

type Props = {}
const ChatRooms: FC<Props> = ({}) => {
  const [search, setSearch] = useState('')
  const { rooms } = useChats()
  return (
    <Styles>
      <div className={'chat-rooms__head'}>
        <div className={classes('mobile', 'chat-rooms__title')}>Chat</div>
        <FormInputUI
          name={'search'}
          icon={<SearchIcon />}
          value={search}
          label={'Search chat room'}
          onUpdate={setSearch}
        />
      </div>
      <div className={'chat-rooms__container'}>
        {Object.values(rooms)
          .map((room) => room.room)
          .map((room) => (
            <ChatRoom room={room} key={room.roomId} />
          ))}
      </div>
    </Styles>
  )
}

export default ChatRooms
