import { useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useTemplateMeals from '../../../../hooks/api/templates/meals/useTemplateMeals'
import { useAuth } from '../../../../hooks/auth.hook'
import { useDataFMConvert } from '../../../../hooks/template.hook'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = ['ID', 'Name', 'Created on', 'Crated from client', 'Options']
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
  const [clientId, setClientId] = useState('all')
  const [name, setName] = useState('')

  const { id } = useAuth()
  const { meals } = useTemplateMeals({ name, clientId })
  console.log(meals)
  const data = useDataFMConvert(meals, id)

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
      baseLink={Routes.ACTIVITIES_TM_ML}
    />
  )
}
