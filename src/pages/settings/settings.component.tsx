import React, { useState } from 'react'
import { useParams } from 'react-router'

import Tabs from '../../components/tabs/tabs.component'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import MobilePage from '../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import Styles from './settings.style'
import LanguageSettings from './settings-languages/settings-languages.component'
import MetricsSettings from './settings-metrics/settings-metrics.component'
import NotificationsSettings from './settings-notifications/settings-notifications.component'

const Settings = () => {
  const params = useParams<{ tab: string }>()
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>(
    params.tab || 'notifications'
  )

  const renderNotificationsSettings = () => <NotificationsSettings />
  const renderMetricsSettings = () => <MetricsSettings />
  const renderLanguagesSettings = () => <LanguageSettings />

  const content = (
    <Styles>
      <Tabs
        className="settings__tabs"
        activeKey={activeTab}
        onChange={(activeKey) => setActiveTab(activeKey)}
        tabs={[
          {
            key: 'notifications',
            label: 'Notifications',
            renderContent: renderNotificationsSettings
          },
          {
            key: 'prefered_metric_system',
            label: 'Preferred Metric System',
            renderContent: renderMetricsSettings
          },
          {
            key: 'prefered_language',
            label: 'Preferred Language',
            renderContent: renderLanguagesSettings
          },
          {
            key: 'billing_method',
            label: 'Billing Method',
            renderContent: () => <div>Billing Method</div>
          }
        ]}
      />
    </Styles>
  )

  return isMobile ? (
    <MobilePage title={'Account Settings'}>{content}</MobilePage>
  ) : (
    content
  )
}

export default Settings
