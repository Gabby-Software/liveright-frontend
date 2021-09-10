import React from 'react'

import { Routes } from '../../enums/routes.enum'
import useUserSettings from '../../hooks/api/settings/useUserSettings'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import HeaderLink from '../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import NotificationSettingItem from './components/notification-setting-item/notification-setting-item.component'
import Styles from './notifications-settings.styles'

const NotificationsSettings = () => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const { notification } = useUserSettings()

  const content = (
    <Styles>
      {!isMobile && (
        <>
          <h2 className="settings__title">
            {t('settings:notifications.title')}
          </h2>
          <p className="settings__subtitle">
            {t('settings:notifications.desc')}
          </p>
        </>
      )}

      <div className="settings__cards">
        {Object.entries(notification).map(([key, value], i) => (
          <NotificationSettingItem key={i} title={key} {...value} />
        ))}
      </div>

      <p className="settings__text">{t('settings:notifications.note')}</p>
    </Styles>
  )

  return isMobile ? (
    <MobilePage
      title={t('settings:notifications.settings-title')}
      headerTopComponent={
        <HeaderLink to={Routes.NOTIFICATIONS}>
          {t('settings:notifications.back-to-notifications')}
        </HeaderLink>
      }
    >
      {content}
    </MobilePage>
  ) : (
    content
  )
}

export default NotificationsSettings
