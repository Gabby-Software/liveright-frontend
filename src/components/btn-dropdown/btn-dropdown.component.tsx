import React, { FC, useRef, useState } from 'react'

import { DownArrowIcon } from '../../assets/media/icons'
import { useOutsideClick } from '../../hooks/click-outside.hook'
import { classes } from '../../pipes/classes.pipe'
import FormButton from '../forms/form-button/form-button.component'
import Styles from './btn-dropdown.styles'

export type BtnDropDownOptionType = {
  label: string
  onClick: () => void
}
type Props = {
  menu: BtnDropDownOptionType[]
}
const BtnDropdown: FC<Props> = ({ menu }) => {
  const [open, setOpen] = useState(false)
  const contRef = useRef<HTMLDivElement>(null)
  useOutsideClick(contRef, () => setOpen(false), open)
  return (
    <Styles className={'btn-dropdown'} ref={contRef}>
      <FormButton
        type={'primary'}
        className={classes(
          'btn-dropdown__button',
          open && 'btn-dropdown__button__open'
        )}
        onClick={() => setOpen(!open)}
      >
        <span className={'btn-dropdown__button__text'}>{'Log Data'}</span>
        <DownArrowIcon className={'btn-dropdown__button__icon'} />
      </FormButton>
      <ul
        className={classes(
          'btn-dropdown__menu',
          open && 'btn-dropdown__menu__open'
        )}
      >
        {menu.map(({ label, onClick }) => (
          <li
            className={'btn-dropdown__menu__item'}
            onClick={() => {
              setOpen(false)
              onClick()
            }}
            key={label}
          >
            {label}
          </li>
        ))}
      </ul>
    </Styles>
  )
}

export default BtnDropdown
