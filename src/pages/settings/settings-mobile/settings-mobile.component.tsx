import React from 'react'
import { useParams } from 'react-router'

import Card from '../../../components/cards/card/card.component'
import { Routes } from '../../../enums/routes.enum'
import HeaderLink from '../../../layouts/mobile-page/components/header-link/header-link.component'
import MobilePage from '../../../layouts/mobile-page/mobile-page.component'
import { content } from '../settings.context'
import { ParamsType } from '../settings.types'
import { Link } from './settings-mobile.styles'
import Styles from './settings-mobile.styles'

const MobileSettings = () => {
  const params = useParams<ParamsType>()

  let title = 'Account Settings'
  let pageContent = (
    <div className="nav-cards">
      {content.map((c) => (
        <Card key={c.key}>
          <Link to={`settings/${c.key}`}>{c.label}</Link>
        </Card>
      ))}
    </div>
  )

  if (params.tab) {
    const c = content.find((c) => c.key === params.tab)
    title = c ? c.label : ''
    pageContent = c ? <c.component /> : <div></div>
  }

  return (
    <MobilePage
      title={title}
      headerTopComponent={
        !params.tab ? (
          <HeaderLink to={Routes.HOME}>Return to Dashboard</HeaderLink>
        ) : (
          <HeaderLink to={Routes.SETTINGS.split('/:')[0]}>
            Return to Account Settings
          </HeaderLink>
        )
      }
    >
      <Styles>{pageContent}</Styles>
    </MobilePage>
  )
}

export default MobileSettings
