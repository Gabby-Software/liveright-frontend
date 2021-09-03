import { Link } from 'react-router-dom'

import UserBadge from '../../../../components/user-badge/user-badge.component'
import { Routes } from '../../../../enums/routes.enum'
import useTrainerAccount from '../../../../hooks/api/accounts/useTrainerAccount'

export default function TrainerBadge() {
  const { user } = useTrainerAccount()
  return (
    <>
      <Link to={Routes.CHAT}>
        <UserBadge
          avatar={user.avatar?.url}
          firstName={user.first_name}
          lastName={user.last_name}
          className="mobile-page-header__badge"
          avatarOnly
        />
      </Link>
      <Link to={Routes.CHAT}>
        <h5 className="mobile-page-header__title">LiveRight</h5>
      </Link>
    </>
  )
}
