import React, { useEffect, useRef, useState } from 'react'

import { ReactComponent as CheckIcon } from '../../assets/media/icons/check-fill.svg'
import { ReactComponent as CloseIcon } from '../../assets/media/icons/times.svg'
import { ReactComponent as TimesIcon } from '../../assets/media/icons/times-fill.svg'
import Animator from '../../hoc/animator/animator.component'
import { classes } from '../../pipes/classes.pipe'
import Styles from './toast.styles'

export type ToastProps = { type: 'success' | 'error'; msg: string }
type ToastPropsInternal = ToastProps & { id: number; onClose?: () => void }
let id = 0
let t = 0
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const toast = { show: (props: ToastProps) => {}, duration: 4000 }
const ToastItem = ({
  type,
  msg,
  idx,
  onClose
}: ToastPropsInternal & { idx: number }) => {
  const [top, setTop] = useState(-50)
  useEffect(() => {
    setTop(idx * 50)
  }, [idx])
  return (
    <Animator value={top} duration={300} func={Animator.SPRING(1)}>
      {({ value }) => (
        <div
          className={classes('alert', `alert__${type}`)}
          style={{ top: `${value}px`, right: 0, position: 'absolute' }}
        >
          {type === 'error' ? <TimesIcon /> : <CheckIcon />}
          <div className={'alert__msg'}>{msg}</div>
          <CloseIcon className={'alert__close'} onClick={onClose} />
        </div>
      )}
    </Animator>
  )
}
const Toast = () => {
  const [toasts, setToasts] = useState<ToastPropsInternal[]>([])
  const tref = useRef<ToastPropsInternal[]>([])
  const remove = (toastId: number) => {
    tref.current = tref.current.filter((t) => t.id !== toastId)
    setToasts([...tref.current])
  }
  toast.show = (props: ToastProps) => {
    clearTimeout(t)
    t = setTimeout(() => {
      const toastId = ++id
      tref.current.unshift({ ...props, id: toastId })
      setToasts([...tref.current])
      setTimeout(() => {
        remove(toastId)
      }, toast.duration)
    }, 400) as unknown as number
  }
  return (
    <Styles>
      {toasts.map((t, i) => (
        <ToastItem {...t} idx={i} key={t.id} onClose={() => remove(t.id)} />
      ))}
    </Styles>
  )
}
export default Toast
