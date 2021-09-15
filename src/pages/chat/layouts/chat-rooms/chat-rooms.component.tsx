import React, { FC, useEffect, useState } from 'react'

import { SearchIcon } from '../../../../assets/media/icons'
import Input from '../../../../components/form/input/input.component'
import useChatOnline from '../../../../hooks/api/chat/useChatOnline'
import { useChats } from '../../../../modules/chat/contexts/chats.context'
import { ChatRoomType } from '../../../../modules/chat/types/chat-room.type'
import ChatNoClients from '../../components/chat-no-clients/chat-no-clients.component'
import ChatRoom from '../../components/chat-room/chat-room.component'
import Styles from './chat-rooms.styles'

type Props = {}

const ChatRooms: FC<Props> = ({}) => {
  const [search, setSearch] = useState('')
  const { rooms } = useChats()
  const [filteredRooms, setFilteredRooms] = useState<ChatRoomType[]>([])
  const { isOnline } = useChatOnline()

  useEffect(() => {
    setFilteredRooms(
      Object.values(rooms)
        .filter(({ room }) =>
          `${room.firstName} ${room.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map(({ room }) => room)
        .sort((a, b) => {
          if (a.unReadMessagesCount && !b.unReadMessagesCount) return -1
          if (!a.unReadMessagesCount && b.unReadMessagesCount) return 1
          return (
            new Date(b.lastMessage?.meta.sent_at || '1970-01-01').getTime() -
            new Date(a.lastMessage?.meta.sent_at || '1970-01-01').getTime()
          )
        })
    )
  }, [rooms, search])

  return (
    <Styles>
      <div className="chat-rooms__head">
        <Input
          id="chat-search"
          prefix={<SearchIcon />}
          defaultValue=""
          placeholder={'Search chat room'}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={'chat-rooms__container'}>
        {filteredRooms?.length ? (
          filteredRooms.map((room) => (
            <ChatRoom
              room={room}
              key={room.roomId}
              online={isOnline(room.account_uuid)}
            />
          ))
        ) : (
          <ChatNoClients />
        )}
      </div>
    </Styles>
  )
}

export default ChatRooms
