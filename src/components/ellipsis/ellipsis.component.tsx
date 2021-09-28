import { PropsWithChildren } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose'

export default function Ellipsis({
  children,
  ...props
}: PropsWithChildren<any>) {
  return (
    <LinesEllipsisLoose
      text={children}
      maxLine={1}
      {...props}
      style={{ overflow: 'hidden' }}
    />
  )
}
