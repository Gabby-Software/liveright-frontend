import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { classes } from '../../pipes/classes.pipe'
import Styles from './card-actions-item.styles'

type Props = {
  onClick?: () => void
  href?: string
  className?: string
  disabled?: boolean
}
const CardActionsItem: FC<Props> = ({
  disabled,
  onClick,
  href,
  className,
  children
}) => {
  if (href) {
    return (
      <Styles
        className={classes(className, disabled && 'card-action-item__disabled')}
      >
        <Link to={href} onClick={disabled ? undefined : onClick}>
          {children}
        </Link>
      </Styles>
    )
  }
  return (
    <Styles
      className={classes(className, disabled && 'card-action-item__disabled')}
      onClick={disabled ? undefined : onClick}
    >
      <a>{children}</a>
    </Styles>
  )
}

export default CardActionsItem
