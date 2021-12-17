import { PropsWithChildren } from 'react'

import { CaretLeftIcon } from '../../../../assets/media/icons'
import Styles from './header-link.styles'

interface HeaderLinkProps {
  to?: string
  onClick?: any
}

export default function HeaderLink({
  children,
  to,
  onClick
}: PropsWithChildren<HeaderLinkProps>) {
  return (
    <Styles variant="text" to={to} onClick={onClick}>
      <CaretLeftIcon />
      {children}
    </Styles>
  )
}
