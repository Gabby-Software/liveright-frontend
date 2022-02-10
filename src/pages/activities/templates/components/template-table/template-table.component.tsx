import React from 'react'
import { Link } from 'react-router-dom'

import { SearchIcon } from '../../../../../assets/media/icons'
import DataPagination from '../../../../../components/data-pagination/data-pagination.component'
import DataTable from '../../../../../components/data-table/data-table.component'
import ClientSelect from '../../../../../components/form/client-select/client-select.component'
import Input from '../../../../../components/form/input/input.component'
import { EmptyPlaceholder } from '../../../../../components/placeholders'
import { useIsMobile } from '../../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../../modules/i18n/i18n.hook'
import { PaginationMetaType } from '../../../../../types/pagination-meta.type'
import TemplateCardList from '../template-card-list/template-card-list.component'
import { Styles } from './template-table.style'

interface TemplatesTableProps {
  onSearch: (value: string) => void
  onClient: (e: any, option: any) => void
  keys: string[]
  labels: string[]
  data: any[]
  baseLink: string
  mobileLabels: { [key: string]: string }
  meta: PaginationMetaType
  onPage: (page: number) => void
}
export default function TemplatesTable(props: TemplatesTableProps) {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const {
    onSearch,
    onClient,
    keys,
    labels,
    data,
    baseLink,
    mobileLabels,
    meta,
    onPage
  } = props

  return (
    <Styles>
      <div className="TemplateTable__filters">
        <Input
          prefix={<SearchIcon />}
          placeholder={t('Search by name')}
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

      <div className="TemplateTable__content">
        {isMobile ? (
          <TemplateCardList
            labels={mobileLabels || {}}
            data={data}
            baseLink={baseLink}
          />
        ) : (
          <DataTable
            labels={labels}
            data={data}
            keys={keys}
            round="10px"
            showSort={false}
            render={{
              options: (row) => (
                <Link
                  to={`${baseLink}/${row.id}`}
                  className="TemplateTable__link"
                >
                  View
                </Link>
              )
            }}
          />
        )}
        {!data.length && <EmptyPlaceholder spacing />}
      </div>
      <div>
        <DataPagination
          page={meta.current_page}
          total={meta.total}
          setPage={onPage}
        />
      </div>
    </Styles>
  )
}
