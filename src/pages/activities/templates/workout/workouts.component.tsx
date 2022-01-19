import React, { useMemo, useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useClients from '../../../../hooks/api/clients/useClients'
import useTemplateWorkouts from '../../../../hooks/api/templates/useTemplateWorkouts'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = [
  'ID',
  'Created on',
  'Name',
  'Days',
  'Crated from client',
  'Options'
]
const KEYS = ['id', 'created', 'name', 'days', 'client', 'options']

// const DATA = [
//   {
//     id: 123,
//     name: 'High Intensity Workout',
//     created: '21-01-2021',
//     client: 'John Travolta',
//     days: '6'
//   }
// ]

export default function Workouts() {
  const { workouts } = useTemplateWorkouts()
  const { clients } = useClients()

  const [search, setSearch] = useState('')
  const [client, setClient] = useState('')

  const data = useMemo(() => {
    const rows = workouts
      .filter(
        (item) =>
          item?.name?.toLowerCase().includes(search.toLowerCase()) &&
          (client === 'all' || client === '' || item?.account_id === client)
      )
      .map((item) => ({
        ...item,
        id: item?._id,
        created: item?.created_at?.substring(0, 10),
        type: item?.info?.type,
        days: Math.ceil(item?.time?.split(':')[0] / 24),
        client: clients.find((a) => a?.id === item?.account_id)
          ? `${clients.find((a) => a?.id === item?.account_id)?.first_name} ${
              clients.find((a) => a?.id === item?.account_id)?.last_name
            }`
          : ''
      }))
    return rows
  }, [workouts, search, client])

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
      baseLink={Routes.ACTIVITIES_TM_WO}
    />
  )
}
