import { ReactNode } from 'react'

import { classes } from '../../../pipes/classes.pipe'
import { noImage } from '../../../pipes/no-image.pipe'
import Styles from './user-badge-card.styles'

interface UserBadgeCardProps {
  img?: string
  firstName: string
  lastName: string
  userRole: string
  component?: ReactNode
  className?: string
  onClick?: () => void
}

export default function UserBadgeCard({
  img,
  firstName = '',
  lastName = '',
  userRole,
  component,
  className,
  onClick
}: UserBadgeCardProps) {
  return (
    <Styles className={classes('user-badge-card', className)} onClick={onClick}>
      <div className="user-badge-card__img">
        {img && <img src={img} alt="avatar" />}
        <span className="user-badge-card__placeholder">
          {noImage(firstName, lastName)}
        </span>
      </div>
      <div className="user-badge-card__content">
        <p className="user-badge-card__title">{firstName + ' ' + lastName}</p>
        <p className="user-badge-card__subtitle">{userRole}</p>
      </div>
      {component}
    </Styles>
  )
}
