import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

import UserBadge from '../../../../../../components/user-badge/user-badge.component'
import { FileType } from '../../../../../../types/file.type'
import Styles from './user-details-card.styles'

interface IProps {
  avatar: FileType | null
  firstName: string
  lastName: string
  joinedAt: string
  getStripeAccountLink: () => void
}

const UserDetailsCard = ({
  avatar,
  firstName,
  lastName,
  joinedAt,
  getStripeAccountLink
}: IProps) => {
  return (
    <Styles className="card">
      <UserBadge
        avatarOnly
        square
        size="md"
        avatar={avatar?.url}
        firstName={firstName}
        lastName={lastName}
      />
      <p className="card__name">
        {firstName} {lastName}
      </p>
      <p className="card__joinedAt">
        Joined {moment(joinedAt).format('MM YYYY')}
      </p>
      <Link
        className="card__account_link"
        to="#"
        onClick={() => getStripeAccountLink()}
      >
        View Stripe Account
      </Link>
    </Styles>
  )
}

export default UserDetailsCard
