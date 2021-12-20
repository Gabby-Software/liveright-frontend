import { FocusEventHandler, ReactNode, useState } from 'react'
import ReactSelect, { MenuPosition } from 'react-select'

import {
  CaretDownIcon,
  HelpIcon,
  SearchIcon
} from '../../../assets/media/icons'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { OptionType } from '../../../types/option.type'
import FormError from '../../forms/form-error/form-error.component'
import SmallModal from '../../small-modal/small-modal.component'
import Tooltip from '../../tooltip/tooltip.component'
import Input from '../input/input.component'
import Label from '../label/label.component'
import { DropdownIndicator, DropdownSearch, Styles } from './select.styles'

export interface SelectProps {
  id: string
  label?: string
  tooltip?: string
  placeholder?: string
  size?: 'sm'
  options: OptionType[]
  name?: string
  value?: any
  defaultValue?: any
  onChange?: (value: any, option: OptionType) => void
  disabled?: boolean
  className?: string
  prefix?: ReactNode
  search?: boolean
  onBlur?: FocusEventHandler
  onSearch?: any
  onBottom?: any
  Components?: any
  menuOpen?: boolean
  loading?: boolean
  menuPosition?: MenuPosition
}

export default function Select({
  id,
  label,
  tooltip,
  placeholder,
  size,
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  className,
  prefix,
  name,
  search,
  onBlur,
  onSearch,
  onBottom,
  Components,
  menuOpen,
  loading,
  menuPosition
}: SelectProps) {
  const isMobile = useIsMobile()
  const [modal, setModal] = useState(false)

  const innerValue: any =
    typeof value === 'string' ? options.find((o) => o.value === value) : value
  const innerDefaultValue: any =
    typeof defaultValue === 'string'
      ? options.find((o) => o.value === defaultValue)
      : defaultValue

  const handleChange = (e: OptionType) => {
    onChange?.(e.value, e)
  }

  if (isMobile) {
    return (
      <>
        <Input
          readOnly
          id={id}
          label={label}
          placeholder={placeholder}
          size={size}
          prefix={prefix}
          disabled={disabled}
          suffix={search ? <SearchIcon /> : <CaretDownIcon />}
          value={innerValue?.label || innerDefaultValue?.label}
          onClick={() => setModal(true)}
          onFocus={(e) => e.target.blur()}
          className={className}
          name={name}
          onBlur={onBlur}
          tooltip={tooltip}
        />
        <SmallModal
          visible={modal}
          onCancel={() => setModal(false)}
          title={label || 'Select'}
          menu={options.map((option) => ({
            name: option.label as string,
            onClick: () => onChange?.(option.value, option)
          }))}
          onBottom={onBottom}
        />
      </>
    )
  }

  return (
    <Styles $size={size} className={className}>
      {label && (
        <Label htmlFor={id}>
          {label}

          {tooltip && (
            <Tooltip title={tooltip}>
              <HelpIcon />
            </Tooltip>
          )}
        </Label>
      )}

      <div className="select__container">
        {!!prefix && <span className="select__prefix">{prefix}</span>}
        <ReactSelect
          id={id}
          placeholder={placeholder}
          options={options}
          value={innerValue}
          defaultValue={innerDefaultValue}
          className="select-container"
          classNamePrefix="select"
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: search ? DropdownSearch : DropdownIndicator,
            ...Components
          }}
          isSearchable={!!onSearch}
          onInputChange={onSearch}
          onMenuScrollToBottom={onBottom}
          onChange={handleChange}
          menuIsOpen={menuOpen}
          loadingMessage={() => 'Loading'}
          isLoading={loading}
          isDisabled={disabled}
          menuPosition={menuPosition}
          menuPlacement="auto"
        />
        {name && <FormError name={name} className="field-error" />}
      </div>
    </Styles>
  )
}

export interface CustomSelectProps {
  id: string
  label?: string
  tooltip?: string
  placeholder?: string
  size?: 'sm'
  options: any[]
  name?: string
  value?: any
  defaultValue?: any
  onChange?: (value: any, option: any) => void
  disabled?: boolean
  className?: string
  prefix?: ReactNode
  search?: boolean
  onBlur?: FocusEventHandler
  onSearch?: any
  onBottom?: any
  Components?: any
  menuOpen?: boolean
  loading?: boolean
  menuPosition?: MenuPosition
}

export function CustomSelect({
  id,
  label,
  tooltip,
  placeholder,
  size,
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  className,
  prefix,
  name,
  search,
  onBlur,
  onSearch,
  onBottom,
  Components,
  menuOpen,
  loading,
  menuPosition
}: CustomSelectProps) {
  const isMobile = useIsMobile()
  const [modal, setModal] = useState(false)

  const innerValue: any =
    typeof value === 'string' ? options.find((o) => o.value === value) : value
  const innerDefaultValue: any =
    typeof defaultValue === 'string'
      ? options.find((o) => o.value === defaultValue)
      : defaultValue

  const handleChange = (e: OptionType) => {
    onChange?.(e.value, e)
  }

  if (isMobile) {
    return (
      <>
        <Input
          readOnly
          id={id}
          label={label}
          placeholder={placeholder}
          size={size}
          prefix={prefix}
          disabled={disabled}
          suffix={search ? <SearchIcon /> : <CaretDownIcon />}
          value={innerValue?.label || innerDefaultValue?.label}
          onClick={() => setModal(true)}
          onFocus={(e) => e.target.blur()}
          className={className}
          name={name}
          onBlur={onBlur}
          tooltip={tooltip}
        />
        <SmallModal
          visible={modal}
          onCancel={() => setModal(false)}
          title={label || 'Select'}
          menu={options.map((option) => ({
            name: option.label as string,
            onClick: () => onChange?.(option.value, option)
          }))}
          onBottom={onBottom}
        />
      </>
    )
  }

  return (
    <Styles $size={size} className={className}>
      {label && (
        <Label htmlFor={id}>
          {label}

          {tooltip && (
            <Tooltip title={tooltip}>
              <HelpIcon />
            </Tooltip>
          )}
        </Label>
      )}

      <div className="select__container">
        {!!prefix && <span className="select__prefix">{prefix}</span>}
        <ReactSelect
          id={id}
          placeholder={placeholder}
          options={options}
          value={innerValue}
          defaultValue={innerDefaultValue}
          className="select-container"
          classNamePrefix="select"
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: search ? DropdownSearch : DropdownIndicator,
            ...Components
          }}
          isSearchable={!!onSearch}
          onInputChange={onSearch}
          onMenuScrollToBottom={onBottom}
          onChange={handleChange}
          menuIsOpen={menuOpen}
          loadingMessage={() => 'Loading'}
          isLoading={loading}
          isDisabled={disabled}
          menuPosition={menuPosition}
          menuPlacement="auto"
        />
        {name && <FormError name={name} className="field-error" />}
      </div>
    </Styles>
  )
}
