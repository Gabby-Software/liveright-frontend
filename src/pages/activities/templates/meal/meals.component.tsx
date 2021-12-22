import { useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useTemplateMeals from '../../../../hooks/api/templates/meals/useTemplateMeals'
import { useAuth } from '../../../../hooks/auth.hook'
import { useDataFMConvert } from '../../../../hooks/template.hook'
import { getObjectFromArrays } from '../../../../utils/obj'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = ['ID', 'Name', 'Created on', 'Crated from client', 'Options']
const KEYS = ['id', 'name', 'created', 'client', 'options']

const MOBILE_LABELS: { [key: string]: string } = getObjectFromArrays(
  KEYS,
  LABELS
)

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
      mobileLabels={MOBILE_LABELS}
      baseLink={Routes.ACTIVITIES_TM_ML}
    />
  )
}
