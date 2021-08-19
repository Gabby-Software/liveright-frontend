import React from 'react'

import logoCompact from '../../../assets/media/logo-compact.png'
import Styles from './switch-account-modal-header.styles'

type Props = { title: string }
const SwitchAccountModalHeader = ({ title }: Props) => {
  return (
    <Styles>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img className={'swa-header__img'} src={logoCompact} />
      <h1 className={'swa-header__title'}>{title}</h1>
    </Styles>
  )
}

export default SwitchAccountModalHeader
