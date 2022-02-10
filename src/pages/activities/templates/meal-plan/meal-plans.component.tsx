import React, { useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useTemplateMealPlans from '../../../../hooks/api/templates/useTemplateMealPlans'
import { useAuth } from '../../../../hooks/auth.hook'
import { useDataMealPlansConvert } from '../../../../hooks/template.hook'
import { getObjectFromArrays } from '../../../../utils/obj'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = [
  'ID',
  'Name',
  'Meals',
  'Created from client',
  'Created on',
  'Options'
]
const KEYS = ['id', 'name', 'meals', 'client', 'created', 'options']

const MOBILE_LABELS: { [key: string]: string } = getObjectFromArrays(
  KEYS,
  LABELS
)

export default function MealPlans() {
  const [clientId, setClientId] = useState('all')
  const [name, setName] = useState('')

  const { id } = useAuth()
  const { mealPlans, meta, onPage } = useTemplateMealPlans({ clientId, name })
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
      mobileLabels={MOBILE_LABELS}
      baseLink={Routes.ACTIVITIES_TM_MP}
      meta={meta}
      onPage={onPage}
    />
  )
}
