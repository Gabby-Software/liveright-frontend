import React, { useState } from 'react'

import {
  CalendarIcon,
  FilterIcon,
  SearchIcon
} from '../../../../assets/media/icons'
import BottomDrawer from '../../../../components/bottom-drawer/bottom-drawer.component'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import { Routes } from '../../../../enums/routes.enum'
import { sessionTypeOptions } from '../../../../enums/session-filters.enum'
import { UseSessions } from '../../../../hooks/api/sessions/useSessions'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { DrawerContent, Styles } from './sessions-filters.styles'

interface Props {
  calendar?: boolean
}

const SessionsFilters: React.FC<
  Props & Pick<UseSessions, 'filters' | 'onFilters' | 'onSearch'>
> = (props) => {
  const { calendar, filters, onFilters, onSearch } = props

  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [filtersDrawer, setFiltersDrawer] = useState(false)

  const typeSelect = (
    <Select
      id="sessions-type"
      value={filters.type || null}
      placeholder={t('sessions:type')}
      options={sessionTypeOptions}
      onChange={(e) => onFilters('type', e === 'All' ? null : e)}
    />
  )

  const clientSelect = (
    <ClientSelect
      id="sessions-client"
      placeholder={t('sessions:filter-by-client')}
      onChange={(e) => onFilters('client_id', e === 'all' ? null : e)}
      value={filters.client_id || null}
    />
  )

  const search = (
    <div className="sessions__filter-search">
      <Input
        id="sessions-search"
        placeholder={t('sessions:filter-input-mobile')}
        prefix={<SearchIcon />}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Styles>
          <div className="sessions__filter-row">
            {search}

            <div className="sessions__filter-buttons">
              <IconButton size="sm" onClick={() => setFiltersDrawer(true)}>
                <FilterIcon />
              </IconButton>
              {calendar && (
                <IconButton size="sm" className="sessions__filter-btn-calendar">
                  <CalendarIcon />
                </IconButton>
              )}
            </div>
          </div>
        </Styles>

        <BottomDrawer
          title="Apply Filters"
          isOpen={filtersDrawer}
          onClose={() => setFiltersDrawer(false)}
        >
          <DrawerContent>
            <div className="sessions__filter-select">{typeSelect}</div>
            <div className="sessions__filter-select">{clientSelect}</div>

            <Button
              className="drawer__submit-btn"
              onClick={() => setFiltersDrawer(false)}
            >
              {t('apply-filters')}
            </Button>
          </DrawerContent>
        </BottomDrawer>
      </>
    )
  }

  return (
    <Styles>
      <div className="sessions__filter-col sessions__filter-col_form">
        {search}

        <div className="sessions__filter-select">{typeSelect}</div>
        <div className="sessions__filter-select">{clientSelect}</div>
      </div>

      {calendar && (
        <div className="sessions__filter-col">
          <Button
            variant="text"
            size="sm"
            className="sessions__filter-calendar-btn"
            to={Routes.CALENDAR}
          >
            <CalendarIcon />
            {t('sessions:open-calendar-link')}
          </Button>
        </div>
      )}
    </Styles>
  )
}

export default SessionsFilters
