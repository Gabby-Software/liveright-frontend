import React, { useState } from 'react'
import { useParams } from 'react-router'

import Tabs from '../../../components/tabs/tabs.component'
import { content } from '../settings.context'
import { ParamsType } from '../settings.types'
import Styles from './settings-desktop.style'

const DesktopSettings = () => {
  const params = useParams<ParamsType>()
  const [activeTab, setActiveTab] = useState<string>(
    params.tab || 'notifications'
  )

  return (
    <Styles>
      <Tabs
        className="settings__tabs"
        activeKey={activeTab}
        onChange={(activeKey) => setActiveTab(activeKey)}
        tabs={content.map((c) => ({
          key: c.key,
          label: c.label,
          renderContent: () => <c.component />
        }))}
      />
    </Styles>
  )
}

export default DesktopSettings
