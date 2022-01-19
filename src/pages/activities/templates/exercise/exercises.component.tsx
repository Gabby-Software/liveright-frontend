import React, { useMemo, useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
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

const convertDate = (dateString: string) => {
  const p = dateString.split(/\D/g)
  return [p[2], p[1], p[0]].join('-')
}

export default function Excercies() {
  const { exercises } = useTemplateExercises()

  const [search, setSearch] = useState('')
  const [client, setClient] = useState('')

  const data = useMemo(() => {
    const rows = exercises
      .filter(
        (item) =>
          item?.name?.toLowerCase().includes(search.toLowerCase()) &&
          (client === 'all' || client === '' || item?.account_id === client)
      )
      .map((item) => ({
        ...item,
        id: item?._id,
        created: convertDate(item?.created_at.substring(0, 10)),
        type: item?.info?.type,
        client: item.account?.user?.full_name
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
