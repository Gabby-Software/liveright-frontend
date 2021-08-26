import { FC, SVGProps } from 'react'

export type MenuItemType = {
  name?: string
  url?: string
  icon?: FC<SVGProps<SVGSVGElement>>
  onClick?: () => void
}
