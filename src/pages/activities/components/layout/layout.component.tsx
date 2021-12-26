import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import LogClient from '../../../progress-log/log-health-data/components/log-client/log-client.component'
import { Styles } from './layout.styles'

interface ActivityLayoutProps {
  children: React.ReactNode
}

export default function ActivityLayout({ children }: ActivityLayoutProps) {
  const { url } = useRouteMatch()
  console.log(url)
  return (
    <Styles>
      <div className="ActivitiesLayout__user">
        <LogClient route={url} />
      </div>
      <div className="ActivitiesLayout__content">{children}</div>
    </Styles>
  )
}
