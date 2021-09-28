import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

import MobileBack from '../../components/mobile-back/mobile-back.component'
import { footerTypes } from '../../enums/footer-types'
import { Routes } from '../../enums/routes.enum'
import { useDesignVersion } from '../../hooks/design-version.hook'
import { useHeader } from '../../hooks/header.hook'
import { usePage } from '../../hooks/page.hook'
import { classes } from '../../pipes/classes.pipe'
import Header from '../header/header.component'
import MobileFooter from '../mobile-footer/mobile-footer.component'
// import Header from '../mobile-page/components/header/header.component'
import Styles from './mobile-layout.styles'

const mobileTitleRef: { setTitleContent: (el: React.ReactNode) => void } = {
  setTitleContent: () => {}
}
export const useMobileTitleContent = (el: React.ReactNode) => {
  useEffect(() => {
    mobileTitleRef.setTitleContent(el)
    return () => mobileTitleRef.setTitleContent(null)
  }, [])
}
const MobileLayout = ({ children }: { children: React.ReactNode }) => {
  const page = usePage()
  const { pathname } = useLocation()
  const { title } = useHeader()
  const version = useDesignVersion()
  const [titleContent, setTitleContent] = useState<React.ReactNode>(null)
  const footerType = useMemo(
    () => (page?.footer === undefined ? footerTypes.DEFAULT : page?.footer),
    [page]
  )
  mobileTitleRef.setTitleContent = setTitleContent
  const noTitlePages = [Routes.CHAT, Routes.SESSIONS]
  const renderTitle = !noTitlePages.some((p) => pathname.startsWith(p))
  const v = useDesignVersion()

  const footer = footerType === footerTypes.NONE ? null : <MobileFooter />

  if (typeof page?.mobileLayout === 'boolean' && !page.mobileLayout) {
    return (
      <>
        {children}
        {footer}
      </>
    )
  }

  return (
    <Styles className={classes(`mobile-layout__v${version}`)}>
      <Header />
      {/* <Header
        title={title}
        actionComponent={actionComponent}
        spacing={headerSpacing}
        component={headerComponent}
        topComponent={headerTopComponent}
        titleIcon={headerTitleIcon}
      /> */}
      <main className={'mobile-layout__main'}>
        {v === 1 ? <MobileBack /> : null}
        {renderTitle ? (
          <h1
            className={classes(
              'mobile-layout__title',
              `mobile-layout__title__v${v}`
            )}
          >
            {title}
            {titleContent}
          </h1>
        ) : null}
        {children}
      </main>
      {footer}
    </Styles>
  )
}

export default MobileLayout
