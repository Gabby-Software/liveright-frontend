import { PropsWithChildren } from 'react'

import { CaretLeftIcon } from '../../../../assets/media/icons'
import Styles from './header-link.styles'

interface HeaderLinkProps {
  to: string
}

export default function HeaderLink({
  children,
  to
}: PropsWithChildren<HeaderLinkProps>) {
  return (
    <Styles variant="text" to={to}>
      <CaretLeftIcon />
      {children}
    </Styles>
  )
}
