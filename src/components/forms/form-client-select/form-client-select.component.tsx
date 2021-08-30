import React, { useEffect, useMemo, useRef, useState } from 'react'

import { EP_GET_CLIENTS } from '../../../enums/api.enum'
import userTypes from '../../../enums/user-types.enum'
import api from '../../../managers/api.manager'
import { AccountObjType } from '../../../types/account.type'
import { OptionType } from '../../../types/option.type'
import FormSelect from '../form-select/form-select.component'

type Props = {
  name: string
  label: string
  onUpdate?: (client: AccountObjType) => void
}
const FormClientSelect = ({ name, label, onUpdate }: Props) => {
  const [clients, setClients] = useState<AccountObjType[]>([])
  const options: OptionType[] = useMemo(() => {
    return clients.map((user: AccountObjType) => ({
      label: `${user.first_name} ${user.last_name}`,
      value: String(
        user.accounts.find((acc) => acc.type === userTypes.CLIENT)?.id || 0
      )
    }))
  }, [clients])
  const timer = useRef(0)
  const m = useRef(Math.random())
  useEffect(() => {
    handleSearch('')
  }, [])
  const handleSearch = (value: string) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const d = Math.random()
      m.current = d
      api
        .get(EP_GET_CLIENTS + `?status=active&query=${value}`)
        .then((res) => res.data.data)
        .then((res) => {
          if (m.current !== d) return
          setClients(res.map(({ user }: { user: AccountObjType }) => user))
        })
    }, 400) as unknown as number
  }
  return (
    <FormSelect
      name={name}
      label={label}
      options={options}
      onSearch={handleSearch}
      onUpdate={(value) => {
        onUpdate &&
          onUpdate(
            clients.find(
              (user) =>
                String(
                  user.accounts.find((acc) => acc.type === userTypes.CLIENT)
                    ?.id || 0
                ) === value
            ) as AccountObjType
          )
      }}
    />
  )
}

export default FormClientSelect
