import React, { useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

import {
  FlashIcon,
  HomeIcon,
  OptionSolidIcon,
  PlanIcon,
  ProgressIcon
} from '../../assets/media/icons'
import { ReactComponent as HubIcon } from '../../assets/media/icons/hub.svg'
import { ReactComponent as ProfileIcon } from '../../assets/media/icons/profile.svg'
import MobileLogDrawer from '../../components/mobile-log-drawer/mobile-log-drawer.component'
import MobileMoreDrawer from '../../components/mobile-more-drawer/mobile-more-drawer.component'
import {
  QuickAccessProvider,
  useQuickAccess
} from '../../components/quick-access/quick-access.context'
import { footerTypes } from '../../enums/footer-types'
import { Routes } from '../../enums/routes.enum'
import { usePage } from '../../hooks/page.hook'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { classes } from '../../pipes/classes.pipe'
import Styles from './mobile-footer.styles'

type MenuItemType = {
  Icon: React.ComponentType
  title: string
  className: string
  url?: string
  onClick?: () => void
}
const MobileFooterContent = () => {
  const { t } = useTranslation()
  const { open: logDrawerOpen, setOpen: setLogDrawerOpen } = useQuickAccess()
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false)
  const location = useLocation()
  const { id } = useParams<any>()
  const page = usePage()
  const footerType = useMemo(
    () => (page?.footer === undefined ? footerTypes.DEFAULT : page?.footer),
    [page]
  )
  const menuItemsOptions: { [key: string]: MenuItemType[] } = {
    [footerTypes.DEFAULT]: [
      {
        Icon: HomeIcon,
        title: 'home',
        className: 'mobile-footer__item',
        url: Routes.HOME
      },
      {
        Icon: PlanIcon,
        title: 'plans',
        className: 'mobile-footer__item',
        url: Routes.PLANS
      },
      {
        Icon: FlashIcon,
        title: '',
        className: 'mobile-footer__add',
        onClick: () => setLogDrawerOpen(true)
      },
      {
        Icon: ProgressIcon,
        title: 'progress',
        className: 'mobile-footer__item',
        url: Routes.PROGRESS_CLIENTS
      },
      {
        Icon: OptionSolidIcon,
        title: 'more',
        className: 'mobile-footer__item',
        onClick: () => setMoreDrawerOpen(true)
      }
    ],
    [footerTypes.TRAINER]: [
      {
        Icon: HubIcon,
        title: 'hub',
        className: 'mobile-footer__item',
        url: `${Routes.CLIENTS}/${id}${Routes.HUB}`
      },
      {
        Icon: FlashIcon,
        title: 'log',
        className: 'mobile-footer__add',
        onClick: () => setLogDrawerOpen(true)
      },
      {
        Icon: ProfileIcon,
        title: 'profile',
        className: 'mobile-footer__item',
        url: `${Routes.CLIENTS}/${id}${Routes.PROFILE}`
      }
    ]
  }
  const menuItems: MenuItemType[] = useMemo(
    () => menuItemsOptions[footerType],
    [footerType]
  )
  return (
    <Styles>
      <div className={'mobile-footer__cont'}>
        {menuItems.map(({ title, className, Icon, url, onClick }) => {
          const child = (
            <div>
              <Icon />
              {title && (
                <span className={'mobile-footer__label'}>
                  {t(`menu.${title}`)}
                </span>
              )}
            </div>
          )
          return url ? (
            <Link
              key={title}
              to={url}
              className={classes(
                className,
                location.pathname === url && 'mobile-footer__item__active'
              )}
            >
              {child}
            </Link>
          ) : (
            <div key={title} className={className} onClick={onClick}>
              {child}
            </div>
          )
        })}
      </div>
      <MobileLogDrawer
        isOpen={logDrawerOpen}
        onClose={() => setLogDrawerOpen(false)}
      />
      <MobileMoreDrawer
        isOpen={moreDrawerOpen}
        onClose={() => setMoreDrawerOpen(false)}
      />
    </Styles>
  )
}
const MobileFooter = () => (
  <QuickAccessProvider>
    <MobileFooterContent />
  </QuickAccessProvider>
)
export default MobileFooter
