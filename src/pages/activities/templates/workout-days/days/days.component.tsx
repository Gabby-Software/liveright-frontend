import React, { useMemo, useState } from 'react'

import { Routes } from '../../../../../enums/routes.enum'
import useTemplateWorkoutDays from '../../../../../hooks/api/templates/workout-days/useTemplateWorkoutDays'
import { useAuth } from '../../../../../hooks/auth.hook'
import { getObjectFromArrays } from '../../../../../utils/obj'
import TemplatesTable from '../../components/template-table/template-table.component'

const LABELS = ['ID', 'Created on', 'Name', 'Created from client', 'Options']
const KEYS = ['id', 'created', 'name', 'client', 'options']

const MOBILE_LABELS: { [key: string]: string } = getObjectFromArrays(
  KEYS,
  LABELS
)

const convertDate = (dateString: string) => {
  const p = dateString.split(/\D/g)
  return [p[2], p[1], p[0]].join('-')
}

export default function WorkoutDays() {
  const { id } = useAuth()

  const [search, setSearch] = useState('')
  const [client, setClient] = useState('all')

  const { workoutDays, meta, onPage } = useTemplateWorkoutDays({
    name: search,
    clientId: client
  })

  const data = useMemo(() => {
    const rows = workoutDays.map((item) => ({
      ...item,
      id: item?._id,
      created: convertDate(item?.created_at?.substring(0, 10)),
      client: item.account_id === id ? '-' : item.account?.user?.full_name
    }))
    return rows
  }, [workoutDays])

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
      mobileLabels={MOBILE_LABELS}
      data={data}
      baseLink={Routes.ACTIVITIES_TM_WD}
      meta={meta}
      onPage={onPage}
    />
  )
}
