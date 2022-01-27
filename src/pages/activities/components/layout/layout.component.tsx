import React from 'react'

import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import ActivitiesClient from '../activities-client/activities-client.component'
import { Styles } from './layout.styles'

interface TemplateLayoutProps {
  children: React.ReactNode
}

export default function TemplateLayout({ children }: TemplateLayoutProps) {
  const { type } = useAuth()
  return (
    <Styles>
      {type !== userTypes.CLIENT && (
        <div className="ActivitiesLayout__user">
          <ActivitiesClient clientId={0} onClientSwitch={() => null} />
        </div>
      )}
      <div className="ActivitiesLayout__content">{children}</div>
    </Styles>
  )
}
