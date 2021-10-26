import React from 'react'

import Select from '../../../../../../components/form/select/select.component'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { PayoutFilters } from '../../../../../../types/payoutTransaction'
import { payoutTypeFilterOptions } from '../../financials-getPaid.data'
import { Styles } from './filters.styles'

interface Props {
  filters: PayoutFilters
  onFilter: (filters: PayoutFilters) => void
}

const GetPaidFilters = ({ onFilter, filters }: Props) => {
  const { t } = useTranslation()
  const typeSelect = (
    <Select
      id="payout-type"
      value={filters.type || ''}
      placeholder={t('financials:payout.type')}
      options={payoutTypeFilterOptions}
      onChange={(e: string) => onFilter(e === '' ? {} : { type: e })}
      className="invoice-filters__status"
    />
  )

  // const clientSelect = (
  //   <ClientSelect
  //     id="sessions-client"
  //     placeholder={t('sessions:filter-by-client')}
  //     onChange={(e) => {
  //       console.log(e)
  //     }}
  //     value={'Dafy Duck'}
  //     className="invoice-filters__user"
  //   />
  // )

  return (
    <Styles className="invoice-filters">
      {typeSelect}
      {/* <Input
        id="invoice-search"
        prefix={<SearchIcon />}
        defaultValue=""
        placeholder={t('search')}
        onChange={(e) => console.log(e.target.value)}
        className="invoice-filters__search"
      /> */}
      {/* {isMobile ? (
        <IconButton className="invoice-filters__filter-btn">
          <FilterIcon />
        </IconButton>
      ) : (
        <>
          {clientSelect}
        </>
      )} */}
    </Styles>
  )
}

export default GetPaidFilters
