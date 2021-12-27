import React from 'react'

import ActivitiesClient from '../activities-client/activities-client.component'
import { Styles } from './layout.styles'

interface ActivityLayoutProps {
  children: React.ReactNode
}

export default function ActivityLayout({ children }: ActivityLayoutProps) {
  return (
    <Styles>
      <div className="ActivitiesLayout__user">
        <ActivitiesClient clientId={0} onClientSwitch={() => null} />
      </div>
      <div className="ActivitiesLayout__content">{children}</div>
    </Styles>
  )
}
