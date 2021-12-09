import React from 'react'

import { Routes } from '../../../../enums/routes.enum'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = [
  'ID',
  'Created on',
  'Name',
  'Days',
  'Crated from client',
  'Options'
]
const KEYS = ['id', 'name', 'created', 'days', 'client', 'options']

const DATA = [
  {
    id: 123,
    name: 'High Intensity Workout',
    created: '21-01-2021',
    client: 'John Travolta',
    days: '6'
  }
]

export default function Workouts() {
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
      data={DATA}
      baseLink={Routes.ACTIVITIES_TM_WO}
    />
  )
}
