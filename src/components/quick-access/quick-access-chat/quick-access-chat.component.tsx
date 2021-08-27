import React, { FC } from 'react'

import { ReactComponent as ChatIcon } from '../../../assets/media/icons/chat.svg'
import { Routes } from '../../../enums/routes.enum'
import { useTranslation } from '../../../modules/i18n/i18n.hook'
import { useQuickAccess } from '../quick-access.context'
import Styles from './quick-access-chat.styles'

type Props = {}
const QuickAccessChat: FC<Props> = ({}) => {
  const { t } = useTranslation()
  const { setOpen } = useQuickAccess()
  return (
    <Styles to={Routes.CHAT} onClick={() => setOpen(false)}>
      <ChatIcon />
      <span>{t('quickaccess:chat')}</span>
    </Styles>
  )
}

export default QuickAccessChat
