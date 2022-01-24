import React, { useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useTemplateMealPlans from '../../../../hooks/api/templates/useTemplateMealPlans'
import { useAuth } from '../../../../hooks/auth.hook'
import { useDataMealPlansConvert } from '../../../../hooks/template.hook'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = [
  'ID',
  'Created on',
  'Name',
  'Meals',
  'Crated from client',
  'Options'
]
const KEYS = ['id', 'name', 'created', 'meals', 'client', 'options']

export default function MealPlans() {
  const [clientId, setClientId] = useState('all')
  const [name, setName] = useState('')

  const { id } = useAuth()
  const { mealPlans } = useTemplateMealPlans({ clientId, name })
  const data = useDataMealPlansConvert(mealPlans, id)
  console.log(data, mealPlans)

  const onSearch = (value: string) => {
    console.log(value)
    setName(value)
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
      baseLink={Routes.ACTIVITIES_TM_MP}
    />
  )
}
