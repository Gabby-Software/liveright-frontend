import { ReactNode } from 'react'

import { classes } from '../../../pipes/classes.pipe'
import Ellipsis from '../../ellipsis/ellipsis.component'
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
  circle?: boolean
  unreadCount?: number
}

export default function UserBadgeCard({
  img,
  firstName = '',
  lastName = '',
  userRole,
  component,
  className,
  onClick,
  online,
  circle,
  unreadCount
}: UserBadgeCardProps) {
  return (
    <Styles className={classes('user-badge-card', className)} onClick={onClick}>
      <UserBadge
        avatarOnly
        square={!circle}
        avatar={img}
        firstName={firstName}
        lastName={lastName}
        online={online}
        unreadCount={unreadCount}
      />

      <div className="user-badge-card__content">
        <p className="user-badge-card__title">{firstName + ' ' + lastName}</p>
        <Ellipsis className="user-badge-card__subtitle">{userRole}</Ellipsis>
      </div>
      {component}
    </Styles>
  )
}
