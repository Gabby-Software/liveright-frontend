import React from 'react'

import { Styles } from './layout.styles'

interface TemplateLayoutProps {
  children: React.ReactNode
}

export default function TemplateLayout({ children }: TemplateLayoutProps) {
  return (
    <Styles>
      <div className="ActivitiesLayout__content">{children}</div>
    </Styles>
  )
}
