import { AutoComplete as AntdAutoComplete } from 'antd'
import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  ReactNode,
  useEffect,
  useRef
} from 'react'

import { HelpIcon } from '../../../assets/media/icons'
import FormError from '../../forms/form-error/form-error.component'
import Tooltip from '../../tooltip/tooltip.component'
import Error, { ErrorProps } from '../error/error.component'
import Label from '../label/label.component'
import Styles from './autoCompleteInput.styles'

export interface AutoCompleteInputProps {
  id: string
  label?: string
  tooltip?: string
  placeholder?: string
  size?: 'sm'
  onChange?: (value: string, option: any) => void
  defaultValue?: string
  value?: string
  options: { label: string; value: string }[]
  onClick?: any
  onFocus?: FocusEventHandler<HTMLInputElement>
  className?: string
  disabled?: boolean
  name?: string
  onBlur?: FocusEventHandler
  labelComponent?: ReactNode
  max?: number
  error?: string
  shouldScrollTo?: Boolean
  onSelect?: (value: string, option: any) => void
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
  ErrorProps?: Pick<ErrorProps, 'size'>
}

const AutoCompleteInput = forwardRef<any, AutoCompleteInputProps>(
  (
    {
      id,
      label,
      tooltip,
      placeholder,
      size,
      defaultValue,
      value,
      options,
      onChange,
      onClick,
      onFocus,
      className,
      disabled,
      name,
      onBlur,
      labelComponent,
      max,
      error,
      shouldScrollTo,
      onSelect,
      onKeyDown,
      ErrorProps
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

    const handleChange = (value: string, option: any) => {
      onChange?.(value, option)
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
        <AntdAutoComplete
          ref={ref}
          id={id}
          placeholder={placeholder}
          className="input__input"
          defaultValue={defaultValue}
          value={value}
          options={options}
          onChange={handleChange}
          onFocus={onFocus}
          disabled={disabled}
          onBlur={onBlur}
          maxLength={max}
          onKeyDown={onKeyDown}
          onSelect={onSelect}
        />
        {name && <FormError name={name} className="field-error" />}
        {error && <Error name={error} {...ErrorProps} />}
      </Styles>
    )
  }
)

export default AutoCompleteInput
