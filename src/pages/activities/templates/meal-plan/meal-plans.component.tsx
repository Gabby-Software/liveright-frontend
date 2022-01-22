import React, { useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useTemplateMealPlans from '../../../../hooks/api/templates/useTemplateMealPlans'
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
  const [clientId, setClientId] = useState('')
  const [name, setName] = useState('')

  const { mealPlans } = useTemplateMealPlans({ clientId, name })
  const data = useDataMealPlansConvert(mealPlans)
  console.log(data, mealPlans)

  const onSearch = (value: string) => {
    console.log(value)
    setName(value)
  }

  const onClient = (e: any) => {
    if (e === 'all') {
      setClientId('')
    } else {
      setClientId(e)
    }
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
