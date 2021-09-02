import React, { FC, useEffect, useState } from 'react'

import { ReactComponent as SearchIcon } from '../../../../assets/media/icons/search.svg'
import { FormInputUI } from '../../../../components/forms/form-input/form-input.component'
import { useChats } from '../../../../modules/chat/contexts/chats.context'
import { ChatRoomType } from '../../../../modules/chat/types/chat-room.type'
import { classes } from '../../../../pipes/classes.pipe'
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
        {filteredRooms.map((room) => (
          <ChatRoom room={room} key={room.roomId} />
        ))}
      </div>
    </Styles>
  )
}

export default ChatRooms
