import { PropsWithChildren } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import {
  Dropdown,
  DropdownMenu,
  DropdownMenuItem
} from '../../../../components/dropdown'
import { Routes } from '../../../../enums/routes.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import { isClient } from '../../../../utils/api/auth'
import { getRoute } from '../../../../utils/routes'

export default function LogDropdown({ children }: PropsWithChildren<any>) {
  const { type } = useAuth()
  const params = useParams<any>()

  const logTo = isClient(type)
    ? getRoute(Routes.PROGRESS_CLIENT_LOG_HEALTH_DATA)
    : getRoute(Routes.PROGRESS_LOG_HEALTH_DATA, {
        id: params.id
      })
  const measurementsTo = isClient(type)
    ? getRoute(Routes.PROGRESS_CLIENT_LOG_MEASUREMENTS)
    : getRoute(Routes.PROGRESS_LOG_MEASUREMENTS, { id: params.id })

  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <DropdownMenu>
          <Link to={measurementsTo}>
            <DropdownMenuItem>Measurements</DropdownMenuItem>
          </Link>
          <Link to={logTo}>
            <DropdownMenuItem>Health</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Photos</DropdownMenuItem>
        </DropdownMenu>
      }
    >
      {children}
    </Dropdown>
  )
}
