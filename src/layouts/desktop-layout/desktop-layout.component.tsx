import React, { useEffect, useState } from 'react'

import MobileBack from '../../components/mobile-back/mobile-back.component'
import PageTitle from '../../components/titles/page-title.styles'
import { useDesignVersion } from '../../hooks/design-version.hook'
import { useHeader } from '../../hooks/header.hook'
import { classes } from '../../pipes/classes.pipe'
import ChatPopups from '../chat-popups/chat-popups.component'
import DesktopSidebar from '../desktop-sidebar/desktop-sidebar.component'
import { configRef } from './desktop-layout.config'
import Styles from './desktop-layout.styles'

const desktopTitleRef: { setTitleContent: (el: React.ReactNode) => void } = {
  setTitleContent: () => {}
}

export const useTitleContent = (el: React.ReactNode) => {
  useEffect(() => {
    desktopTitleRef.setTitleContent(el)
    return () => desktopTitleRef.setTitleContent(null)
  }, [el])
}

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  const { title } = useHeader()
  const version = useDesignVersion()
  const [titleContent, setTitleContent] = useState<React.ReactNode>(null)
  const [className, setClassName] = useState('')
  configRef.setClassName = setClassName
  desktopTitleRef.setTitleContent = setTitleContent

  return (
    <Styles>
      <DesktopSidebar />
      <div
        className={classes(
          'layout__wrapper',
          `design-v__${version}`,
          className
        )}
      >
        {/*<DesktopHeader/>*/}
        <MobileBack />

        {title && (
          <PageTitle>
            {title}
            {titleContent}
          </PageTitle>
        )}
        <main>{children}</main>
      </div>
      <ChatPopups />
    </Styles>
  )
}

export default DesktopLayout
