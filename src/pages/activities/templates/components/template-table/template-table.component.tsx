import React from 'react'

import { SearchIcon } from '../../../../../assets/media/icons'
import ClientSelect from '../../../../../components/form/client-select/client-select.component'
import Input from '../../../../../components/form/input/input.component'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { Styles } from './template-table.style'

interface TemplatesTableProps {
  onSearch: (value: string) => void
  onClient: (e: any, option: any) => void
  children: React.ReactNode
}
export default function TemplatesTable(props: TemplatesTableProps) {
  const { t } = useTranslation()
  const { onSearch, onClient, children } = props

  return (
    <Styles>
      <div className="TemplateTable__filters">
        <Input
          prefix={<SearchIcon />}
          placeholder={t('search')}
          id="templates-search"
          className="TemplateTable__search"
          onChange={(e) => onSearch(e.target.value)}
        />
        <ClientSelect
          id="TemplateTable-client"
          onChange={onClient}
          placeholder="All Client"
          className="TemplateTable__select"
        />
      </div>

      <div className="TemplateTable__content">{children}</div>
    </Styles>
  )
}
