import React, { useEffect, useState } from 'react'

import { FormSelectUI } from '../../../../components/forms/form-select/form-select.component'
import { EP_GET_INVOICE_ISSUERS } from '../../../../enums/api.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useAuth } from '../../../../hooks/auth.hook'
import api from '../../../../managers/api.manager'
import { OptionType } from '../../../../types/option.type'

type Props = {
  name: string
  label: string
  value: string
  onUpdate: (val: string) => void
}
const FormSelectIssuer = ({ name, label, value, onUpdate }: Props) => {
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
    <FormSelectUI
      name={name}
      value={value}
      label={label}
      options={options}
      onUpdate={onUpdate}
    />
  )
}

export default FormSelectIssuer
