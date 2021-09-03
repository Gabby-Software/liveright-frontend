import React, { useEffect, useState } from 'react'

import Select from '../../../../components/form/select/select.component'
import { EP_GET_INVOICE_ISSUERS } from '../../../../enums/api.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import api from '../../../../managers/api.manager'
import { OptionType } from '../../../../types/option.type'

type Props = {
  name?: string
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onUpdate?: (val: string) => void
  id: string
  className?: string
}
const FormSelectIssuer = ({
  label,
  value,
  defaultValue,
  onUpdate,
  id,
  placeholder,
  className
}: Props) => {
  const [options, setOptions] = useState<OptionType[]>([])
  const { type } = useAuth()
  useEffect(() => {
    api
      .get<{
        data: { id: number; user: { first_name: string; last_name: string } }[]
      }>(EP_GET_INVOICE_ISSUERS)
      .then((res) => res.data.data)
      .then((res) => {
        setOptions([
          {
            label: type === userTypes.CLIENT ? 'All Issuers' : 'All Clients',
            value: ''
          },
          ...res.map(({ id, user }) => ({
            label: `${user.first_name} ${user.last_name}`,
            value: `${id}`
          }))
        ])
      })
  }, [])
  return (
    <Select
      id={id}
      value={value}
      defaultValue={defaultValue}
      label={label}
      options={options}
      onChange={onUpdate}
      placeholder={placeholder}
      className={className}
    />
  )
}

export default FormSelectIssuer
