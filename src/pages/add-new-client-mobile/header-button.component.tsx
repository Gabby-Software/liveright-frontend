import { PropsWithChildren } from 'react'

import { CaretLeftIcon } from '../../assets/media/icons'
import HeaderButtonStyles from './header-button.styles'

type HeaderButtonProps = {
  onClick: () => void
}

export default function HeaderButton({
  children,
  onClick
}: PropsWithChildren<HeaderButtonProps>) {
  return (
    <HeaderButtonStyles variant={'text'} onClick={onClick}>
      <CaretLeftIcon />
      {children}
    </HeaderButtonStyles>
  )
}
