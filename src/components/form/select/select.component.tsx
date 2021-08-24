import { Select as AntdSelect } from 'antd'
import { useState } from 'react'

import { CaretDownIcon } from '../../../assets/media/icons'
import { useIsMobile } from '../../../hooks/is-mobile.hook'
import { OptionType } from '../../../types/option.type'
import SmallModal from '../../small-modal/small-modal.component'
import Input from '../input/input.component'
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
  const isMobile = useIsMobile()
  const [modal, setModal] = useState(false)

  if (isMobile) {
    return (
      <>
        <Input
          id={id}
          label={label}
          placeholder={placeholder}
          size={size}
          suffix={<CaretDownIcon />}
          onClick={() => setModal(true)}
          onFocus={(e) => e.target.blur()}
        />
        <SmallModal
          visible={modal}
          onCancel={() => setModal(false)}
          title={label || 'Select'}
          menu={options.map(({ label }) => ({
            name: label,
            onClick: () => {}
          }))}
        />
      </>
    )
  }

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
