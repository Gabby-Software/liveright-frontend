import React, { ComponentType, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  ClientSolidIcon,
  Invoice3Icon,
  LogoutIcon,
  OptionsIcon as SettingsIcon,
  ProfileIcon,
  ProgressIcon,
  RevenueIcon,
  RoundedArrowIcon,
  UsersIcon
} from '../../assets/media/icons'
import { Routes } from '../../enums/routes.enum'
import userTypes from '../../enums/user-types.enum'
import { useAuth } from '../../hooks/auth.hook'
import { useTranslation } from '../../modules/i18n/i18n.hook'
import { identity } from '../../pipes/identity.pipe'
import { ACTION_LOGOUT_REQUEST } from '../../store/action-types'
import BottomDrawer from '../bottom-drawer/bottom-drawer.component'
import SwitchAccountModal from '../switch-account-modal/switch-account-modal.component'
import Styles from './mobile-more-drawer.styles'

type MobileMoreDrawerPropsType = {
  isOpen: boolean
  onClose: () => void
}
type LinkType = {
  Icon: ComponentType
  onClick?: () => void
  url?: string
  name: string
  permission?: string
}

const MobileMoreDrawer = ({ isOpen, onClose }: MobileMoreDrawerPropsType) => {
  const { t } = useTranslation()
  const [switchAccountOpen, setSwitchAccountOpen] = useState(false)
  const { type } = useAuth()
  const dispatch = useDispatch()

  const menuItems: LinkType[] = [
    { Icon: ProfileIcon, url: identity('/profile'), name: 'menu.profile' },
    {
      Icon: ClientSolidIcon,
      url: Routes.CLIENTS,
      name: 'menu.clients',
      permission: userTypes.TRAINER
    },
    {
      name: 'menu.progress',
      url: Routes.PROGRESS_CLIENTS,
      Icon: ProgressIcon,
      permission: userTypes.TRAINER
    },
    {
      Icon: Invoice3Icon,
      url: Routes.INVOICES,
      name: 'menu.invoices',
      permission: userTypes.CLIENT
    },
    {
      Icon: RevenueIcon,
      url: Routes.FINANCIALS_OVERVIEW,
      name: 'menu.financials',
      permission: userTypes.TRAINER
    },
    { Icon: UsersIcon, url: Routes.SESSIONS, name: 'menu.sessions' },
    {
      Icon: RoundedArrowIcon,
      onClick: () => {
        setSwitchAccountOpen(true)
        onClose()
      },
      name: 'menu.switch-account'
    },
    {
      Icon: SettingsIcon,
      url: Routes.SETTINGS.split('/:')[0],
      name: 'menu.settings'
    },
    {
      Icon: LogoutIcon,
      onClick: () => dispatch({ type: ACTION_LOGOUT_REQUEST }),
      name: 'menu.log-out'
    }
  ]

  return (
    <>
      <BottomDrawer isOpen={isOpen} onClose={onClose} title={t('menu.more')}>
        <Styles>
          <ul className={'more__menu'}>
            {menuItems.map(({ onClick, Icon, url, name, permission }, index) =>
              permission && permission !== type ? null : (
                <li className={'more__item'} key={index}>
                  {url?.startsWith('http') ? (
                    <a href={url} onClick={onClose}>
                      <Icon />
                      <span className={'more__label'}>{t(name)}</span>
                    </a>
                  ) : url ? (
                    <Link to={url} onClick={onClose}>
                      <Icon />
                      <span className={'more__label'}>{t(name)}</span>
                    </Link>
                  ) : (
                    <a onClick={onClick}>
                      <Icon />
                      <span className={'more__label'}>{t(name)}</span>
                    </a>
                  )}
                </li>
              )
            )}
          </ul>
        </Styles>
      </BottomDrawer>
      <SwitchAccountModal
        isOpen={switchAccountOpen}
        onClose={() => setSwitchAccountOpen(false)}
      />
    </>
  )
}

export default MobileMoreDrawer
