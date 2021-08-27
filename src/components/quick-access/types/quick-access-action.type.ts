import { FC, SVGProps } from 'react'

import { quickAccessRoutes } from '../quick-access.routes'

export type QuickAccessActionType = {
  route: quickAccessRoutes
  icon: FC<SVGProps<SVGSVGElement>>
  label: string
  color: string
}
