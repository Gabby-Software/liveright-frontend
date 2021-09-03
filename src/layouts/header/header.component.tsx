import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import ChatIcon from '../../components/chat-icon/chat-icon.component'
import { DEFAULT_TITLE } from '../../config/header.config'
import userTypes from '../../enums/user-types.enum'
import useTrainerAccount from '../../hooks/api/accounts/useTrainerAccount'
import { useAuth } from '../../hooks/auth.hook'
import { useDesignVersion } from '../../hooks/design-version.hook'
import { useHeader } from '../../hooks/header.hook'
import { classes } from '../../pipes/classes.pipe'
import { HeaderItemType, HeaderItemTypes } from '../../types/route.type'
import Styles, { HeaderV2 } from './header.styles'

const Header = () => {
  const { pathname } = useLocation()
  const { type: userType } = useAuth()
  const { user: trainer } = useTrainerAccount()
  const { items } = useHeader()
  const version = useDesignVersion()

  if (!items?.length) return null

  const renderHeaderItem = ({ type, href, Icon }: HeaderItemType) => {
    switch (type) {
      case HeaderItemTypes.IMAGE:
        if (userType !== userTypes.CLIENT) {
          Icon = Icon as React.ComponentType
          return (
            <Link
              to={href || ''}
              className={classes(
                'header__icon',
                'header__icon__first',
                pathname === href && 'header__icon__active',
                'header__profile'
              )}
            >
              <Icon />
            </Link>
          )
        }
        if (!trainer) return null
        return (
          <Link
            to={href || ''}
            className={classes(
              'header__icon',
              'header__icon__first',
              pathname === href && 'header__icon__active',
              'header__profile'
            )}
          >
            <ChatIcon />
          </Link>
        )
      case HeaderItemTypes.ICON:
        Icon = Icon as React.ComponentType
        return (
          <Link
            to={href || ''}
            className={classes(
              'header__icon',
              pathname === href && 'header__icon__active'
            )}
          >
            <Icon />
          </Link>
        )
      case HeaderItemTypes.SPACE:
        return <div className={'header__space'} />
      case HeaderItemTypes.SUBMIT:
        Icon = Icon as React.ComponentType
        return (
          <label className={'header__icon'} htmlFor={href || 'form-submit'}>
            <Icon />
          </label>
        )
    }
  }
  const Header = version === 2 ? HeaderV2 : Styles
  return (
    <Header>
      <nav className={'header__nav'}>
        <h1 className={'header__title'}>{DEFAULT_TITLE}</h1>
        {items?.map((t, i) => (
          <React.Fragment key={i}>{renderHeaderItem(t)}</React.Fragment>
        ))}
      </nav>
    </Header>
  )
}

export default Header
