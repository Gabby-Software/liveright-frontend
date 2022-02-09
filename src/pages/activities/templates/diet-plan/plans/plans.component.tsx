import { useState } from 'react'

import { Routes } from '../../../../../enums/routes.enum'
import useTemplateDietPlans from '../../../../../hooks/api/templates/diet-plan/useTemplateDietPlans'
import { useAuth } from '../../../../../hooks/auth.hook'
import { useDataDietPlansConvert } from '../../../../../hooks/template.hook'
import { getObjectFromArrays } from '../../../../../utils/obj'
import TemplatesTable from '../../components/template-table/template-table.component'

const LABELS = [
  'ID',
  'Name',
  'Days',
  'Created from client',
  'Created on',
  'Options'
]
const KEYS = ['id', 'name', 'days', 'client', 'created', 'options']

const MOBILE_LABELS: { [key: string]: string } = getObjectFromArrays(
  KEYS,
  LABELS
)

export default function DietPlans() {
  const [clientId, setClientId] = useState('all')
  const [name, setName] = useState('')

  const { id } = useAuth()
  const { dietTemplates, meta, onPage } = useTemplateDietPlans({
    clientId,
    name
  })
  const data = useDataDietPlansConvert(dietTemplates, id)

  const onSearch = (value: string) => {
    console.log(value)
    setName(value)
  }

  const onClient = (e: any) => {
    console.log(e)
    setClientId(e)
  }

  return (
    <TemplatesTable
      onClient={onClient}
      onSearch={onSearch}
      keys={KEYS}
      labels={LABELS}
      mobileLabels={MOBILE_LABELS}
      data={data}
      baseLink={Routes.ACTIVITIES_TM_DP}
      meta={meta}
      onPage={onPage}
    />
  )
}
