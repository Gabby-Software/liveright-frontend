import React, { FC, useState } from 'react'

import { ReactComponent as SearchIcon } from '../../../../assets/media/icons/search.svg'
import { FormInputUI } from '../../../../components/forms/form-input/form-input.component'
import { mockRooms } from '../../chat.data'
import ChatRoom from '../../components/chat-room/chat-room.component'
import Styles from './chat-rooms.styles'

type Props = {}
const ChatRooms: FC<Props> = ({}) => {
  const [search, setSearch] = useState('')
  return (
    <Styles>
      <FormInputUI
        name={'search'}
        icon={<SearchIcon />}
        value={search}
        label={'Search chat room'}
        onUpdate={setSearch}
      />
      <div className={'chat-rooms__container'}>
        {mockRooms.map((room) => (
          // eslint-disable-next-line react/jsx-key
          <ChatRoom room={room} />
        ))}
      </div>
    </Styles>
  )
}

export default ChatRooms
