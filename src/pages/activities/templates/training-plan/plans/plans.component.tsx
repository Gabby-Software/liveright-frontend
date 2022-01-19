import React, { useMemo, useState } from 'react'

import { Routes } from '../../../../../enums/routes.enum'
import useTemplateTrainingPlans from '../../../../../hooks/api/templates/training-plans/useTemplateTrainingPlans'
import TemplatesTable from '../../components/template-table/template-table.component'

const LABELS = [
  'ID',
  'Created on',
  'Name',
  'Days',
  'Crated from client',
  'Options'
]
const KEYS = ['id', 'created', 'name', 'days', 'client', 'options']

const convertDate = (dateString: string) => {
  const p = dateString.split(/\D/g)
  return [p[2], p[1], p[0]].join('-')
}

export default function TrainingPlans() {
  const { trainingPlans } = useTemplateTrainingPlans()

  const [search, setSearch] = useState('')
  const [client, setClient] = useState('')

  const data = useMemo(() => {
    const rows = trainingPlans
      .filter(
        (item) =>
          item?.name?.toLowerCase().includes(search.toLowerCase()) &&
          (client === 'all' || client === '' || item?.account_id === client)
      )
      .map((item) => ({
        ...item,
        id: item?._id,
        created: convertDate(item?.created_at?.substring(0, 10)),
        type: item?.info?.type,
        days: item?.revisions[0]?.days_count,
        client: item.account?.user?.full_name,
        revisionId: item?.revisions[0]?._id
      }))
    return rows
  }, [trainingPlans, search, client])

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
      baseLink={Routes.ACTIVITIES_TM_TP}
    />
  )
}
