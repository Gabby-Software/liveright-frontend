import React, { useRef } from 'react'
import styled from 'styled-components'

import { ReactComponent as ArrowIcon } from '../../assets/media/icons/back-arrow.svg'
import { useSwipe } from '../../hooks/swipe.hook'
import Drawer from './bottom-drawer.styles'

type Props = {
  children: React.ReactNode
  title?: string
  isOpen: boolean
  onClose: () => void
  back?: boolean
  isLogDrawer?: boolean
}
const BottomDrawer = ({
  children,
  title,
  isOpen,
  onClose,
  back,
  isLogDrawer
}: Props) => {
  const ref = useRef(null)
  const { y } = useSwipe(ref, ({ y }) => y >= 50, onClose)
  return (
    <Drawer
      placement={'bottom'}
      onClose={onClose}
      className={'drawer-bottom'}
      style={{ '--top': `-${Math.max(0, y)}px` } as any}
      visible={isOpen}
      closable={false}
      height={'auto'}
      isLogDrawer={isLogDrawer}
    >
      <div className={'drawer__wrapper'}>
        <div className={'drawer__header'} ref={ref}>
          {title ? (
            <>
              {back ? (
                <ArrowIcon className={'drawer__back'} onClick={onClose} />
              ) : null}
              <h3 className={'drawer__title'}>{title}</h3>
            </>
          ) : null}
        </div>
        {children}
      </div>
    </Drawer>
  )
}
BottomDrawer.Body = styled.div`
  padding: 40px 20px;
  max-height: 100%;
  overflow: auto;
`
export default BottomDrawer
