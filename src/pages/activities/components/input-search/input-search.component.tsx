import React, { ChangeEvent } from 'react'
import { CustomSelect } from '../../../../components/form/select/select.component'
import { AddIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'

interface InputSearchProps {
  id: string
  label?: string
  placeholder?: string
  options: any[]
  value: string
  onSearch: any
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const InputSearch = (props: InputSearchProps) => {

  const { options, ...other } = props
  
  
  return (
    <CustomSelect
      {...other}
      search
      options={options}
      className="WorkoutAccordion__control"
    />
  )
}
