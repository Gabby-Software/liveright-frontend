import React from 'react'

import NotificationSettingItem from './notification-setting-item/notification-setting-item.component'
import useUserSettings from '../../../../hooks/api/settings/useUserSettings'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import Styles from './settings-notifications.styles'

const NotificationsSettings = () => {
  const { t } = useTranslation()
  const { notification, onUpdate } = useUserSettings()

  return (
    <Styles>
      <div className="settings__cards">
        {Object.entries(notification).map(([key, value], i) => (
          <NotificationSettingItem
            key={i}
            title={key}
            {...value}
            onUpdate={(t) => onUpdate({ ...notification, [key]: t })}
          />
        ))}
      </div>

      <p className="settings__text">{t('settings:notifications.note')}</p>
    </Styles>
  )
}

export default NotificationsSettings
