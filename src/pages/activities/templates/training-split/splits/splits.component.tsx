import React from 'react'
import { Link } from 'react-router-dom'

import DataTable from '../../../../../components/data-table/data-table.component'
import { EmptyPlaceholder } from '../../../../../components/placeholders'
import { Routes } from '../../../../../enums/routes.enum'
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

const DATA = [
  {
    id: 1,
    name: '10 Days of Wonder',
    created: '21-01-2021',
    client: 'John Travolta',
    days: '5'
  },
  {
    id: 2,
    name: 'Reduce Bodyweight',
    created: '18-10-2021',
    client: 'Jackson',
    days: '7'
  }
]

export default function TrainingSplits() {
  const onSearch = (value: string) => {
    console.log(value)
  }

  const onClient = (e: any, option: any) => {
    console.log(e, option)
  }

  return (
    <TemplatesTable onClient={onClient} onSearch={onSearch}>
      <DataTable
        labels={LABELS}
        data={DATA}
        keys={KEYS}
        round="10px"
        render={{
          options: (row) => (
            <Link
              to={`${Routes.ACTIVITIES_TM_TS}/${row.id}`}
              className="TemplateTable__table-link"
            >
              View
            </Link>
          )
        }}
      />
      {!DATA.length && <EmptyPlaceholder spacing />}
    </TemplatesTable>
  )
}
