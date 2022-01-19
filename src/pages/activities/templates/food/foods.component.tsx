import { useState } from 'react'

import { Routes } from '../../../../enums/routes.enum'
import useTemplateFoods from '../../../../hooks/api/templates/useTemplateFoods'
import { useDataFMConvert } from '../../../../hooks/template.hook'
import TemplatesTable from '../components/template-table/template-table.component'

const LABELS = ['ID', 'Created on', 'Name', 'Crated from client', 'Options']
const KEYS = ['id', 'name', 'created', 'client', 'options']

// const DATA = [
//   {
//     id: 123,
//     name: 'Chicken Breast, 1',
//     created: '21-01-2021',
//     client: 'John Travolta'
//   },
//   {
//     id: 124,
//     name: 'Chicken Breast, 2',
//     created: '21-01-2021',
//     client: 'John Travolta'
//   }
// ]

export default function Foods() {
  // const [clientId, setClientId] = useState('')
  const [name, setName] = useState('')

  const onSearch = (value: string) => {
    console.log(value)
    setName(value)
  }

  const onClient = (e: any) => {
    console.log(e)
    // setClientId(e)
  }

  const { foods } = useTemplateFoods({ name })
  const DATA = useDataFMConvert(foods)

  return (
    <TemplatesTable
      onClient={onClient}
      onSearch={onSearch}
      keys={KEYS}
      labels={LABELS}
      data={DATA}
      baseLink={Routes.ACTIVITIES_TM_FO}
    />
  )
}
