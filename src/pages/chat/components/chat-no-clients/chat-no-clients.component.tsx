import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { ChatIcon } from '../../../../assets/media/icons'
import { Routes } from '../../../../enums/routes.enum'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Styles from './chat-no-clients.styles'

const ChatNoClients: FC = () => {
  const { t } = useTranslation()
  return (
    <Styles className={'chat-no-client'}>
      <ChatIcon className={'chat-no-client__icon'} />
      <div className={'chat-no-client__desc'}>{t('chat:no-clients')}</div>
      <Link to={Routes.CLIENTS + '/?add=1'} className={'chat-no-client__cta'}>
        {t('chat:invite')}
      </Link>
    </Styles>
  )
}

export default ChatNoClients
