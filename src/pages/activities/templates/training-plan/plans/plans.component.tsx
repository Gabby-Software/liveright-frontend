import React, { useMemo, useState } from 'react'

import { Routes } from '../../../../../enums/routes.enum'
import useTemplateTrainingPlans from '../../../../../hooks/api/templates/training-plans/useTemplateTrainingPlans'
import { useAuth } from '../../../../../hooks/auth.hook'
import { getObjectFromArrays } from '../../../../../utils/obj'
import TemplatesTable from '../../components/template-table/template-table.component'

const LABELS = [
  'ID',
  'Name',
  'Days',
  'Created from client',
  'Created on',
  'Options'
]
const KEYS = ['id', 'created', 'name', 'days', 'client', 'options']

const convertDate = (dateString: string) => {
  const p = dateString.split(/\D/g)
  return [p[2], p[1], p[0]].join('-')
}

const MOBILE_LABELS: { [key: string]: string } = getObjectFromArrays(
  KEYS,
  LABELS
)

export default function TrainingPlans() {
  const { id } = useAuth()

  const [search, setSearch] = useState('')
  const [client, setClient] = useState('all')

  const { trainingPlans } = useTemplateTrainingPlans({
    name: search,
    clientId: client
  })

  const data = useMemo(() => {
    const rows = trainingPlans.map((item) => ({
      ...item,
      id: item?._id,
      created: convertDate(item?.created_at?.substring(0, 10)),
      type: item?.info?.type,
      days: item?.days_count,
      client: item.account_id === id ? '-' : item.account?.user?.full_name,
      revisionId: item?.revisions[0]?._id
    }))
    return rows
  }, [trainingPlans])

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
      mobileLabels={MOBILE_LABELS}
      baseLink={Routes.ACTIVITIES_TM_TP}
    />
  )
}
