import moment from 'moment'
import React, { useMemo } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useTemplateMeals from '../../../../hooks/api/templates/useTemplateMeals'
import { DATE_RENDER_FORMAT } from '../../../../utils/date'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = ['ID', 'Name', 'Created on', 'Crated from client', 'Options']
const KEYS = ['id', 'name', 'created', 'client', 'options']

export default function Meals() {
  const { meals } = useTemplateMeals()

  const data = useMemo(() => {
    return meals.map((m: any) => ({
      id: m._id,
      name: m.name,
      created: moment(m.created_at).format(DATE_RENDER_FORMAT),
      client: 'No Info From BE.'
    }))
  }, [meals])

  console.log(meals)

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
      data={data}
      baseLink={Routes.ACTIVITIES_TM_ML}
    />
  )
}
