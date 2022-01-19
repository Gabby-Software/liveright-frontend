import { useState } from 'react'

import { Routes } from '../../../../../enums/routes.enum'
import useTemplateDietPlans from '../../../../../hooks/api/templates/diet-plan/useTemplateDietPlans'
import { useDataDietPlansConvert } from '../../../../../hooks/template.hook'
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

// const DATA = [
//   {
//     id: 123,
//     name: 'Diet Plan From Nov 10',
//     created: '21-01-2021',
//     client: 'John Travolta',
//     days: '6'
//   }
// ]

export default function DietPlans() {
  const [clientId, setClientId] = useState('')
  const [name, setName] = useState('')
  const { dietTemplates } = useTemplateDietPlans({ clientId, name })
  const data = useDataDietPlansConvert(dietTemplates)

  const onSearch = (value: string) => {
    console.log(value)
    setName(value)
  }

  const onClient = (e: any) => {
    console.log(e)
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
      baseLink={Routes.ACTIVITIES_TM_DP}
    />
  )
}
