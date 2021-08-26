import { Tooltip as AntdTooltip, TooltipProps } from 'antd'
import { CSSProperties } from 'react'

import { classes } from '../../pipes/classes.pipe'

const overlayInnerStyle: CSSProperties = {
  padding: '0.75rem',
  borderRadius: 8,
  fontSize: '0.625rem'
}

export default function Tooltip({ overlayClassName, ...props }: TooltipProps) {
  return (
    <AntdTooltip
      overlayClassName={classes('tooltip', overlayClassName)}
      overlayInnerStyle={overlayInnerStyle}
      {...props}
    />
  )
}
