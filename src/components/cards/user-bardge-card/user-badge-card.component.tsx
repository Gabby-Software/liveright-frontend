import { ReactNode } from 'react'

import { classes } from '../../../pipes/classes.pipe'
import UserBadge from '../../user-badge/user-badge.component'
import Styles from './user-badge-card.styles'

interface UserBadgeCardProps {
  img?: string
  firstName: string
  lastName: string
  userRole: string
  component?: ReactNode
  className?: string
  onClick?: () => void
  online?: boolean
}

export default function UserBadgeCard({
  img,
  firstName = '',
  lastName = '',
  userRole,
  component,
  className,
  onClick,
  online
}: UserBadgeCardProps) {
  return (
    <Styles className={classes('user-badge-card', className)} onClick={onClick}>
      <UserBadge
        avatarOnly
        square
        avatar={img}
        firstName={firstName}
        lastName={lastName}
        online={online}
      />

      <div className="user-badge-card__content">
        <p className="user-badge-card__title">{firstName + ' ' + lastName}</p>
        <p className="user-badge-card__subtitle">{userRole}</p>
      </div>
      {component}
    </Styles>
  )
}
