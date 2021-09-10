import React from 'react'

import { FormToggleUI } from '../../../../components/forms/form-toggle/form-toggle.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { NotificationsSettingsType } from '../../notifications-settings.type'
import Styles from './notification-setting-item.styles'

const NotificationSettingItem = ({
  title,
  email,
  browser
}: NotificationsSettingsType) => {
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
            onUpdate={() => {}}
          />
        </div>
        <div className="settings-item__action">
          <FormToggleUI
            label={t('settings:notifications.browser')}
            value={browser}
            onUpdate={() => {}}
          />
        </div>
      </div>
    </Styles>
  )
}

export default NotificationSettingItem
