import React, { useState } from 'react'

import { Routes } from '../../../../../enums/routes.enum'
import useTemplateTrainingSplits from '../../../../../hooks/api/templates/training-splits/useTemplateTrainingSplits'
import { useDataTSConvert } from '../../../../../hooks/template.hook'
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
const KEYS = ['id', 'name', 'days', 'client', 'created', 'options']

const MOBILE_LABELS: { [key: string]: string } = getObjectFromArrays(
  KEYS,
  LABELS
)

export default function TrainingSplits() {
  const [clientId, setClientId] = useState('all')
  const { trainingSplits, meta, onPage } = useTemplateTrainingSplits({
    clientId: clientId
  })
  console.log(trainingSplits)
  const data = useDataTSConvert(trainingSplits, 10)

  const onSearch = (value: string) => {
    console.log(value)
  }

  const onClient = (e: any) => {
    setClientId(e)
  }
  // return <div>test</div>
  return (
    <TemplatesTable
      onClient={onClient}
      onSearch={onSearch}
      keys={KEYS}
      labels={LABELS}
      data={data}
      mobileLabels={MOBILE_LABELS}
      baseLink={Routes.ACTIVITIES_TM_TS}
      meta={meta}
      onPage={onPage}
    />
  )
}
