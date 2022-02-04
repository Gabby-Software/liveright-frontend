import { Input as AntdInput } from 'antd'
import React, {
  ChangeEvent,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  ReactNode,
  useEffect,
  useRef
} from 'react'

import { HelpIcon } from '../../../assets/media/icons'
import { Formatter } from '../../../managers/formatter.manager'
import FormError from '../../forms/form-error/form-error.component'
import Tooltip from '../../tooltip/tooltip.component'
import Error, { ErrorProps } from '../error/error.component'
import Label from '../label/label.component'
import Styles from './input.styles'

export interface InputProps {
  id: string
  type?: 'text' | 'password' | 'number'
  label?: string
  tooltip?: string
  placeholder?: string
  size?: 'sm'
  suffix?: ReactNode
  prefix?: ReactNode
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  defaultValue?: string | number
  value?: string | number
  onClick?: any
  onFocus?: FocusEventHandler<HTMLInputElement>
  readOnly?: boolean
  className?: string
  disabled?: boolean
  name?: string
  onBlur?: FocusEventHandler
  format?: Formatter
  labelComponent?: ReactNode
  max?: number
  error?: string
  shouldScrollTo?: Boolean
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  ErrorProps?: Pick<ErrorProps, 'size'>
  bordered?: boolean
}

const Input = forwardRef<any, InputProps>(
  (
    {
      id,
      label,
      tooltip,
      type = 'text',
      placeholder,
      size,
      suffix,
      prefix,
      defaultValue,
      value,
      onChange,
      onClick,
      onFocus,
      readOnly,
      className,
      disabled,
      name,
      onBlur,
      format,
      labelComponent,
      max,
      error,
      shouldScrollTo,
      onKeyPress,
      onKeyDown,
      ErrorProps,
      bordered
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLLabelElement>(null)
    const handleScrollTo = () => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
      if (shouldScrollTo) {
        handleScrollTo()
      }
    }, [shouldScrollTo])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (format) {
        onChange?.({
          ...e,
          target: { ...e.target, value: format.format(e.target.value) }
        })
        return
      }
      onChange?.(e)
    }
    return (
      <Styles
        $size={size}
        onClick={onClick}
        className={className}
        $disabled={disabled}
      >
        {label && (
          <Label ref={scrollRef} htmlFor={id} className="input__label">
            {labelComponent}

            {label}

            {tooltip && (
              <Tooltip title={tooltip}>
                <HelpIcon />
              </Tooltip>
            )}
          </Label>
        )}
        <AntdInput
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          className="input__input"
          suffix={suffix}
          prefix={prefix}
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          onFocus={onFocus}
          readOnly={readOnly}
          disabled={disabled}
          onBlur={onBlur}
          maxLength={max}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          bordered={bordered}
        />
        {name && <FormError name={name} className="field-error" />}
        {error && <Error name={error} {...ErrorProps} />}
      </Styles>
    )
  }
)

export default Input
