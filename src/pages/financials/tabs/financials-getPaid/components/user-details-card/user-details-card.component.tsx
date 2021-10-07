import moment from 'moment'
import React from 'react'

import UserBadge from '../../../../../../components/user-badge/user-badge.component'
import Styles from './user-details-card.styles'

interface IProps {
  avatar: {
    img: string
    firstName: string
    lastName: string
  }
  joinedAt: string
  stripeAccountLink: string
}

const UserDetailsCard = ({ avatar, joinedAt, stripeAccountLink }: IProps) => {
  return (
    <Styles className="card">
      <UserBadge
        avatarOnly
        square
        size="md"
        avatar={avatar.img}
        firstName={avatar.firstName}
        lastName={avatar.lastName}
      />
      <p className="card__name">
        {avatar.firstName} {avatar.lastName}
      </p>
      <p className="card__joinedAt">
        Joined {moment(joinedAt).format('MM YYYY')}
      </p>
      <a className="card__account_link" href={stripeAccountLink}>
        View Stripe Account
      </a>
    </Styles>
  )
}

export default UserDetailsCard
