import React, { FC, useEffect, useState } from 'react'

import { ReactComponent as SearchIcon } from '../../../../assets/media/icons/search.svg'
import { FormInputUI } from '../../../../components/forms/form-input/form-input.component'
import { useChats } from '../../../../modules/chat/contexts/chats.context'
import { ChatRoomType } from '../../../../modules/chat/types/chat-room.type'
import { classes } from '../../../../pipes/classes.pipe'
import ChatNoClients from '../../components/chat-no-clients/chat-no-clients.component'
import ChatRoom from '../../components/chat-room/chat-room.component'
import Styles from './chat-rooms.styles'

type Props = {}
const ChatRooms: FC<Props> = ({}) => {
  const [search, setSearch] = useState('')
  const { rooms } = useChats()
  const [filteredRooms, setFilteredRooms] = useState<ChatRoomType[]>([])
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
  // useEffect(() => {
  //   setFilteredRooms([])
  // }, [])
  // const filteredRooms: ChatRoomType[] = useMemo(() => {
  //   return Object.values(rooms)
  //     .filter(({ room }) =>
  //       `${room.firstName} ${room.lastName}`
  //         .toLowerCase()
  //         .includes(search.toLowerCase())
  //     )
  //     .map(({ room }) => room)
  // }, [search, rooms])
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
        {filteredRooms?.length ? (
          filteredRooms.map((room) => (
            <ChatRoom room={room} key={room.roomId} />
          ))
        ) : (
          <ChatNoClients />
        )}
      </div>
    </Styles>
  )
}

export default ChatRooms
