import { Select as AntdSelect } from 'antd'

import { CaretDownIcon } from '../../../assets/media/icons'
import { OptionType } from '../../../types/option.type'
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
  onChange?: any
}

export default function Select({
  id,
  label,
  placeholder,
  size,
  options,
  value,
  defaultValue,
  onChange
}: SelectProps) {
  return (
    <Styles $size={size}>
      {label && <label htmlFor={id}>{label}</label>}
      <AntdSelect
        id={id}
        placeholder={placeholder}
        className="select__input"
        suffixIcon={<CaretDownIcon />}
        options={options}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Styles>
  )
}
