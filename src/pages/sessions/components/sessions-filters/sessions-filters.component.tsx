import debounce from 'lodash.debounce'
import React, { useEffect, useState } from 'react'

import {
  CalendarIcon,
  FilterIcon,
  SearchIcon
} from '../../../../assets/media/icons'
import {
  ActiveFilterCard,
  ActiveFilters
} from '../../../../components/active-filters'
import BottomDrawer from '../../../../components/bottom-drawer/bottom-drawer.component'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import ClientSelect from '../../../../components/form/client-select/client-select.component'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import { Routes } from '../../../../enums/routes.enum'
import { sessionTypeOptions } from '../../../../enums/session-filters.enum'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionFilter } from '../../../../types/session.type'
import { formatFilters } from '../../sessions.utils'
import { DrawerContent, Styles } from './sessions-filters.styles'

interface Props {
  onUpdate: (filter: SessionFilter) => void
  calendar?: boolean
  filters: SessionFilter
}

const SessionsFilters: React.FC<Props> = (props) => {
  const { onUpdate, calendar, filters } = props
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [filtersDrawer, setFiltersDrawer] = useState(false)
  const [date, setDate] = useState('')

  const handleUpdate = (name: keyof SessionFilter, value: string) => {
    onUpdate(((prevState: SessionFilter) => {
      const copy = { ...prevState }
      if (value) {
        return {
          ...copy,
          [name]: value
        }
      }
      delete copy[name]
      return copy
    }) as SessionFilter)
  }

  const handleUpdateFilters = () => {
    formatFilters('', date, onUpdate)
  }

  useEffect(() => {
    handleUpdateFilters()
  }, [date])

  const handleInputChange = debounce((e) => {
    setDate(e.target.value)
  }, 400)

  const typeSelect = (
    <Select
      id="sessions-type"
      value={filters.type}
      placeholder={t('sessions:type')}
      options={sessionTypeOptions}
      onChange={(e) => handleUpdate('type', e === 'All' ? null : e)}
    />
  )

  const clientSelect = (
    <ClientSelect
      id="sessions-client"
      placeholder={t('sessions:filter-by-client')}
      onChange={(e) => handleUpdate('client_id', e === 'all' ? null : e)}
      value={filters.client_id}
    />
  )

  if (isMobile) {
    return (
      <>
        <Styles>
          <div className="sessions__filter-row">
            <div className="sessions__filter-search">
              <Input
                formik
                id="sessions-search"
                placeholder={t('sessions:filter-input-mobile')}
                prefix={<SearchIcon />}
                onChange={handleInputChange}
              />
            </div>

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
        <div className="sessions__filter-search">
          <Input
            formik
            id="sessions-search"
            placeholder={t('sessions:filter-input')}
            prefix={<SearchIcon />}
            onChange={handleInputChange}
          />
        </div>
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
