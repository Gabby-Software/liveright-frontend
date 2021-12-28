import React from 'react'

import LogClient from '../../../progress-log/log-health-data/components/log-client/log-client.component'
import { Styles } from './layout.styles'

interface ActivityLayoutProps {
  children: React.ReactNode
}

export default function ActivityLayout({ children }: ActivityLayoutProps) {
  return (
    <Styles>
      <div className="ActivitiesLayout__user">
        <LogClient />
      </div>
      <div className="ActivitiesLayout__content">{children}</div>
    </Styles>
  )
}
