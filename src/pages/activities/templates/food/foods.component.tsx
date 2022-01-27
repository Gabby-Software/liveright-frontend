import { useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useTemplateFoods from '../../../../hooks/api/templates/useTemplateFoods'
import { useAuth } from '../../../../hooks/auth.hook'
import { useDataFMConvert } from '../../../../hooks/template.hook'
import { getObjectFromArrays } from '../../../../utils/obj'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = ['ID', 'Name', 'Crated from client', 'Created on', 'Options']
const KEYS = ['id', 'name', 'client', 'created', 'options']

const MOBILE_LABELS: { [key: string]: string } = getObjectFromArrays(
  KEYS,
  LABELS
)

export default function Foods() {
  const [clientId, setClientId] = useState('all')
  const [name, setName] = useState('')

  const onSearch = (value: string) => {
    console.log(value)
    setName(value)
  }

  const onClient = (e: any) => {
    console.log(e)
    setClientId(e)
  }

  const { id } = useAuth()
  const { foods } = useTemplateFoods({ name, clientId })
  const DATA = useDataFMConvert(foods, id)

  return (
    <TemplatesTable
      onClient={onClient}
      onSearch={onSearch}
      keys={KEYS}
      labels={LABELS}
      mobileLabels={MOBILE_LABELS}
      data={DATA}
      baseLink={Routes.ACTIVITIES_TM_FO}
    />
  )
}
