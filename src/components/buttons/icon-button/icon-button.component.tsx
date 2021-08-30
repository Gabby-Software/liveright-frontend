import { Tooltip } from 'antd'
import { forwardRef, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

import Root from './icon-button.styles'

interface IconButtonProps {
  size?: 'sm'
  tooltip?: string
  to?: string
  className?: string
  onClick?: any
  TooltipProps?: any
  LinkProps?: any
}

const IconButton = forwardRef<any, PropsWithChildren<IconButtonProps>>(
  (props, ref) => {
    const { children, size, to, tooltip, className, TooltipProps, LinkProps } =
      props

    let content
    content = (
      <Root $size={size} className={className} ref={ref}>
        {children}
      </Root>
    )

    if (to) {
      content = (
        <Link to={to} {...LinkProps}>
          {content}
        </Link>
      )
    }

    if (tooltip) {
      content = (
        <Tooltip title={tooltip} {...TooltipProps}>
          {content}
        </Tooltip>
      )
    }

    return content
  }
)

export default IconButton
