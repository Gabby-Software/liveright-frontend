import React, { useState } from 'react'

import { FilterIcon, SearchIcon } from '../../../../../../assets/media/icons'
import IconButton from '../../../../../../components/buttons/icon-button/icon-button.component'
import ClientSelect from '../../../../../../components/form/client-select/client-select.component'
import Input from '../../../../../../components/form/input/input.component'
import Select from '../../../../../../components/form/select/select.component'
import { sessionTypeOptions } from '../../../../../../enums/session-filters.enum'
import { useIsMobile } from '../../../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../../../modules/i18n/i18n.hook'
import { Styles } from './filters.styles'

const GetPaidFilters = () => {
  const isMobile = useIsMobile()
  const { t } = useTranslation()
  const [type, setType] = useState(sessionTypeOptions[0].value)

  const typeSelect = (
    <Select
      id="sessions-type"
      value={type}
      placeholder={t('sessions:type')}
      options={sessionTypeOptions}
      onChange={(e) => setType(e)}
      className="invoice-filters__status"
    />
  )

  const clientSelect = (
    <ClientSelect
      id="sessions-client"
      placeholder={t('sessions:filter-by-client')}
      onChange={(e) => {
        console.log(e)
      }}
      value={'Dafy Duck'}
      className="invoice-filters__user"
    />
  )

  return (
    <Styles className="invoice-filters">
      <Input
        id="invoice-search"
        prefix={<SearchIcon />}
        defaultValue=""
        placeholder={t('search')}
        onChange={(e) => console.log(e.target.value)}
        className="invoice-filters__search"
      />
      {isMobile ? (
        <IconButton className="invoice-filters__filter-btn">
          <FilterIcon />
        </IconButton>
      ) : (
        <>
          {typeSelect}
          {clientSelect}
        </>
      )}
    </Styles>
  )
}

export default GetPaidFilters
