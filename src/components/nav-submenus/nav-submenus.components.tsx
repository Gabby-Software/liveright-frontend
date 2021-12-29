import React, { useState } from 'react'
import { Link, matchPath } from 'react-router-dom'

import { DownArrowIcon } from '../../assets/media/icons'
import { useIsMobile } from '../../hooks/is-mobile.hook'
import { capitalize } from '../../pipes/capitalize.pipe'
import { classes } from '../../pipes/classes.pipe'
import {
  ClientsStyles,
  MobileStyles,
  TrainerStyles
} from './nav-submenus.styles'

interface IProps {
  Icon: React.ComponentType
  name: string
  pathname: string
  occur?: string[]
  url: string
  submenu: {
    name: string
    url: string
    matchUrl?: string
  }[]
  styleType: 'Trainer' | 'Client'
  onClick?: () => void
}

const NavSubMenu = ({
  Icon,
  name,
  submenu,
  pathname,
  occur,
  url,
  styleType,
  onClick
}: IProps) => {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const Styles = isMobile
    ? MobileStyles
    : styleType === 'Trainer'
    ? TrainerStyles
    : ClientsStyles

  const onNavClicked = () => {
    onClick && onClick()
  }

  return (
    <Styles>
      <div
        className={classes(
          'sidebar__item',
          (pathname === url || occur?.some((o) => pathname.includes(o))) &&
            'sidebar__item_active'
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="sidebar__item__name">
          <div className="sidebar__item-icon__wrapper">
            <Icon />
          </div>

          <span>{capitalize(name)}</span>
        </div>
        <DownArrowIcon className={open ? 'sidebar__item__uparrow' : ''} />
      </div>
      {open && (
        <div className="submenu">
          {submenu.map((m, i) => (
            <Link
              className={classes(
                'submenu__item',
                matchPath(pathname, {
                  path: m.matchUrl || m.url,
                  exact: false,
                  strict: false
                }) && 'submenu__item_active'
              )}
              to={m.url}
              key={i}
              onClick={onNavClicked}
            >
              {m.name}
            </Link>
          ))}
        </div>
      )}
    </Styles>
  )
}

export default NavSubMenu
