// import React, { useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useTemplateMeals from '../../../../hooks/api/templates/useTemplateMeals'
import { useDataMealsConvert } from '../../../../hooks/template.hook'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = ['ID', 'Created on', 'Name', 'Crated from client', 'Options']
const KEYS = ['id', 'name', 'created', 'client', 'options']

// const DATA = [
//   {
//     id: 123,
//     name: 'Delicious Chicken Bries With Spinach',
//     created: '21-01-2021',
//     client: 'John Travolta'
//   }
// ]

export default function Meals() {
  // const [clientId, setClientId] = useState('')
  // const [name, setName] = useState('')

  const { meals } = useTemplateMeals()
  const DATA = useDataMealsConvert(meals)
  console.log(DATA)

  const onSearch = (value: string) => {
    console.log(value)
    // setName(value)
  }

  const onClient = (e: any) => {
    // setClientId(e)
    console.log(e)
  }

  return (
    <TemplatesTable
      onClient={onClient}
      onSearch={onSearch}
      keys={KEYS}
      labels={LABELS}
      data={DATA}
      baseLink={Routes.ACTIVITIES_TM_ML}
    />
  )
}
