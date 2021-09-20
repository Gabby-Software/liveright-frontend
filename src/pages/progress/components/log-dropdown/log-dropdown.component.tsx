import { PropsWithChildren } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem
} from '../../../../components/dropdown'
import { Routes } from '../../../../enums/routes.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { getRoute } from '../../../../utils/routes'

export default function LogDropdown({ children }: PropsWithChildren<any>) {
  const { type } = useAuth()
  const params = useParams<any>()

  const logTo =
    type === userTypes.CLIENT
      ? getRoute(Routes.PROGRESS_CLIENT_LOG_HEALTH_DATA)
      : getRoute(Routes.PROGRESS_LOG_HEALTH_DATA, {
          id: params.id
        })

  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <DropdownMenu>
          <Link to={logTo}>
            <DropdownMenuItem>Health</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Measurements</DropdownMenuItem>
          <DropdownMenuItem>Photos</DropdownMenuItem>
        </DropdownMenu>
      }
    >
      {children}
    </Dropdown>
  )
}
