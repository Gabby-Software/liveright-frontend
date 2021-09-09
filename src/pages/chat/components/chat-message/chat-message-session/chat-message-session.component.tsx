import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { CalendarIcon } from '../../../../../assets/media/icons'
import FormButton from '../../../../../components/forms/form-button/form-button.component'
import { Routes } from '../../../../../enums/routes.enum'
import Styles from './chat-message-session.styles'

type Props = { me: boolean }
const ChatMessageSession: FC<Props> = ({ me }) => {
  return (
    <Styles className={'cm-session'} me={me}>
      <div className={'cm-session__left'}>
        <div className={'cm-session__title'} />
        <div className={'cm-session__date'}>
          <CalendarIcon />
          <span>22-05-2020 at 15:00</span>
        </div>
      </div>
      <div className={'cm-session__right'}>
        <Link to={Routes.SESSIONS} className={'cm-session__cta'}>
          <FormButton type={'text'}>{'Manage'}</FormButton>
        </Link>
      </div>
    </Styles>
  )
}

export default ChatMessageSession
