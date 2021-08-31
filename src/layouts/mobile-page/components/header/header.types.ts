import { ReactNode } from 'react'

export interface HeaderProps {
  title: string
  actionComponent: ReactNode
  spacing?: number
  component?: ReactNode
  headerLink?: ReactNode
  topComponent?: ReactNode
  titleIcon?: ReactNode
}
