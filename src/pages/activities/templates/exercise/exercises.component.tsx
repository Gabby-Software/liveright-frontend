import React, { useMemo, useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useClients from '../../../../hooks/api/clients/useClients'
import useTemplateExercises from '../../../../hooks/api/templates/useTemplateExercises'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = [
  'ID',
  'Created on',
  'Name',
  'Type',
  'Crated from client',
  'Options'
]
const KEYS = ['id', 'created', 'name', 'type', 'client', 'options']

// const DATA = [
//   {
//     id: 123,
//     name: 'Pushups',
//     created: '21-01-2021',
//     client: 'John Travolta',
//     type: 'Higher Body'
//   }
// ]

export default function Excercies() {
  const { exercises } = useTemplateExercises()
  const { clients } = useClients()
  console.log('exercises', exercises)

  const [search, setSearch] = useState('')
  const [client, setClient] = useState('')

  const data = useMemo(() => {
    const rows = exercises
      .filter(
        (item) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) &&
          (client === 'all' || client === '' || item.account_id === client)
      )
      .map((item) => ({
        ...item,
        id: item._id,
        created: item.created_at.substring(0, 10),
        type: item.info.type ? item.info.type : '',
        client: clients.find((a) => a.id === item.account_id)
          ? `${clients.find((a) => a.id === item.account_id)?.first_name} ${
              clients.find((a) => a.id === item.account_id)?.last_name
            }`
          : ''
      }))
    return rows
  }, [exercises, search, client])

  const onSearch = (value: string) => {
    setSearch(value)
  }

  const onClient = (e: any) => {
    setClient(e)
  }

  return (
    <TemplatesTable
      onClient={onClient}
      onSearch={onSearch}
      keys={KEYS}
      labels={LABELS}
      data={data}
      baseLink={Routes.ACTIVITIES_TM_EX}
    />
  )
}
