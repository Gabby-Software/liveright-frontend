import React, { useState } from 'react'

import { Routes } from '../../../../../enums/routes.enum'
import useTrainingSplits from '../../../../../hooks/api/activities/useTrainingSplits'
import { useDataTSConvert } from '../../../../../hooks/template.hook'
import TemplatesTable from '../../components/template-table/template-table.component'

const LABELS = [
  'ID',
  'Created on',
  'Name',
  'Days',
  'Crated from client',
  'Options'
]
const KEYS = ['id', 'name', 'created', 'days', 'client', 'options']

export default function TrainingSplits() {
  const [clientId, setClientId] = useState('all')
  const { trainingSplits } = useTrainingSplits({
    clientId: clientId
  })
  const data = useDataTSConvert(trainingSplits, 10)
  console.log(trainingSplits, data)
  const onSearch = (value: string) => {
    console.log(value)
  }

  const onClient = (e: any) => {
    setClientId(e)
  }

  return (
    <TemplatesTable
      onClient={onClient}
      onSearch={onSearch}
      keys={KEYS}
      labels={LABELS}
      data={data}
      baseLink={Routes.ACTIVITIES_TM_TS}
    />
  )
}
