import React from 'react'

import { Routes } from '../../../../../enums/routes.enum'
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

const DATA = [
  {
    id: 1,
    name: '10 Days of Wonder',
    days: '5',
    client: 'John Travolta',
    created: '21-01-2021'
  },
  {
    id: 2,
    name: 'Reduce Bodyweight',
    days: '7',
    client: 'Jackson',
    created: '18-10-2021'
  }
]

const MOBILE_LABELS: { [key: string]: string } = getObjectFromArrays(
  KEYS,
  LABELS
)

export default function TrainingSplits() {
  const onSearch = (value: string) => {
    console.log(value)
  }

  const onClient = (e: any, option: any) => {
    console.log(e, option)
  }

  return (
    <TemplatesTable
      onClient={onClient}
      onSearch={onSearch}
      keys={KEYS}
      labels={LABELS}
      mobileLabels={MOBILE_LABELS}
      data={DATA}
      baseLink={Routes.ACTIVITIES_TM_TS}
    />
  )
}
