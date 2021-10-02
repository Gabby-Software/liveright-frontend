import React from 'react'

import { FormToggleUI } from '../../../../../components/forms/form-toggle/form-toggle.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { NotificationSettingsCategoryValuesType } from '../../../../../modules/notifications/types/notification-settings.type'
import { NotificationsSettingsType } from '../../settings-notifications.type'
import Styles from './notification-setting-item.styles'

interface NotificationSettingItemProps {
  onUpdate: (e: NotificationSettingsCategoryValuesType) => void
}

const NotificationSettingItem = ({
  title,
  email,
  browser,
  onUpdate
}: NotificationsSettingsType & NotificationSettingItemProps) => {
  const { t } = useTranslation()
  return (
    <Styles>
      <h3 className="settings-item__title">
        {t(`notifications:categories.${title}`)}
      </h3>

      <div className="settings-item__divider" />

      <div className="settings-item__actions">
        <div className="settings-item__action">
          <FormToggleUI
            label={t('settings:notifications.email')}
            value={email}
            onUpdate={(val) => onUpdate({ email: val, browser })}
          />
        </div>
        <div className="settings-item__action">
          <FormToggleUI
            label={t('settings:notifications.browser')}
            value={browser}
            onUpdate={(val) => onUpdate({ email, browser: val })}
          />
        </div>
      </div>
    </Styles>
  )
}

export default NotificationSettingItem
