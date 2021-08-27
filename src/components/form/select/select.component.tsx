import { Select as AntdSelect } from 'antd'
import { ReactNode, useState } from 'react'

import { CaretDownIcon } from '../../../assets/media/icons'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { OptionType } from '../../../types/option.type'
import SmallModal from '../../small-modal/small-modal.component'
import Input from '../input/input.component'
import Label from '../label/label.component'
import Styles from './select.styles'

interface SelectProps {
  id: string
  label?: string
  placeholder?: string
  size?: 'sm'
  options: OptionType[]
  name?: string
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
  disabled?: boolean
  className?: string
  prefix?: ReactNode
}

export default function Select({
  id,
  label,
  placeholder,
  size,
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  className,
  prefix
}: SelectProps) {
  const isMobile = useIsMobile()
  const [modal, setModal] = useState(false)

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
          suffix={<CaretDownIcon />}
          value={options.find((o) => o.value === value || defaultValue)?.label}
          onClick={() => setModal(true)}
          onFocus={(e) => e.target.blur()}
          className={className}
        />
        <SmallModal
          visible={modal}
          onCancel={() => setModal(false)}
          title={label || 'Select'}
          menu={options.map(({ label, value }) => ({
            name: label,
            onClick: () => onChange?.(value)
          }))}
        />
      </>
    )
  }

  return (
    <Styles $size={size} className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="select__container">
        {!!prefix && <span className="select__prefix">{prefix}</span>}
        <AntdSelect
          id={id}
          placeholder={placeholder}
          className="select__input"
          suffixIcon={<CaretDownIcon />}
          options={options}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </div>
    </Styles>
  )
}
