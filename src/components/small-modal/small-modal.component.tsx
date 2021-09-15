import { ModalProps } from 'antd'
import React from 'react'

import useScrollBottomListener from '../../hooks/ui/useScrollBottomListener'
import { classes } from '../../pipes/classes.pipe'
import StyledModal from './small-modal.styles'

export type MenuItem = {
  name: string
  value?: string
  onClick?: (value?: string) => void
  type?: 'primary' | 'default'
  Wrap?: React.ComponentType<any>
}

type Props = ModalProps & {
  title: string
  menu: (MenuItem | null)[]
  onBottom?: any
}

function Content({ menu, onCancel, title, onBottom }: Props) {
  const { scrollRef } = useScrollBottomListener({ callback: onBottom })
  return (
    <>
      <div className={'small-modal__title'}>{title}</div>

      <ul className={'small-modal__body'} ref={scrollRef}>
        {menu
          .filter((t) => !!t)
          .map((item, i) => {
            const {
              name,
              onClick,
              type = 'default',
              Wrap = React.Fragment
            } = item as MenuItem
            return (
              <li
                className={classes(
                  'small-modal__item',
                  `small-modal__item__${type}`
                )}
                key={i}
                onClick={(e) => {
                  onCancel && onCancel(e)
                  onClick && onClick()
                }}
              >
                <Wrap>{name}</Wrap>
              </li>
            )
          })}
      </ul>
    </>
  )
}

const SmallModal = (props: Props) => {
  const { visible, onCancel } = props
  return (
    <StyledModal
      visible={visible}
      closable={false}
      footer={null}
      className={'small-modal'}
      onCancel={onCancel}
    >
      <Content {...props} />
    </StyledModal>
  )
}

export default SmallModal
