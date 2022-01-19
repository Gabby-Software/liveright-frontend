import React from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useTemplateMealPlans from '../../../../hooks/api/templates/useTemplateMealPlans'
import { useDataMealsConvert } from '../../../../hooks/template.hook'
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

// const DATA = [
//   {
//     id: 123,
//     name: 'Low Carb Day',
//     created: '21-01-2021',
//     client: 'John Travolta',
//     meals: '3'
//   }
// ]

export default function MealPlans() {
  const { mealPlans } = useTemplateMealPlans()
  const DATA = useDataMealsConvert(mealPlans)
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
      baseLink={Routes.ACTIVITIES_TM_MP}
    />
  )
}
