import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { classes } from '../../pipes/classes.pipe'
import { MenuItemType } from '../../types/menu-item.type'
import Styles from './routed-tabs.styles'

type Props = {
  tabs: MenuItemType[]
  className?: string
}

const RoutedTabs = ({ tabs, className }: Props) => {
  const { pathname } = useLocation()
  const activeRef = useRef<HTMLDivElement>(null)
  const [[left, width], setIndicator] = useState([0, 0])

  useEffect(() => {
    if (!activeRef.current) setIndicator([0, 0])
    else
      setIndicator([
        activeRef.current.offsetLeft,
        activeRef.current.offsetWidth
      ])
  }, [activeRef, pathname])

  return (
    <Styles className={classes('tabs', className)}>
      <div className={'tabs__wrapper'}>
        {tabs.map(({ name, url }) => (
          <div
            key={url}
            className={'tabs__item__wrapper'}
            ref={pathname === url ? activeRef : null}
          >
            <Link
              to={url || ''}
              className={classes(
                'tabs__item',
                pathname === url && 'tabs__item__active'
              )}
            >
              {name}
            </Link>
          </div>
        ))}
        <div
          className={'tabs__indicator'}
          style={{ '--w': `${width}px`, '--l': `${left}px` } as any}
        />
      </div>
    </Styles>
  )
}

export default RoutedTabs
