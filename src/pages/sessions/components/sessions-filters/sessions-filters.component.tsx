import debounce from 'lodash.debounce'
import React, { useEffect, useState } from 'react'

import {
  CalendarIcon,
  FilterIcon,
  SearchIcon
} from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import { Routes } from '../../../../enums/routes.enum'
import { sessionTypeOptions } from '../../../../enums/session-filters.enum'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionFilter } from '../../../../types/session.type'
import { formatFilters } from '../../sessions.utils'
import Styles from './sessions-filters.styles'

interface Props {
  onUpdate: (filter: SessionFilter) => void
  calendar?: boolean
}

const SessionsFilters: React.FC<Props> = (props) => {
  const { onUpdate, calendar } = props
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [date, setDate] = useState('')
  const [type, setType] = useState('All')

  const handleUpdateFilters = () => {
    formatFilters(type, date, onUpdate)
  }

  useEffect(() => {
    handleUpdateFilters()
  }, [type, date])

  const handleInputChange = debounce((e) => {
    setDate(e.target.value)
  }, 400)

  if (isMobile) {
    return (
      <Styles>
        <div className="sessions__filter-row">
          <div className="sessions__filter-search">
            <Input
              id="sessions-search"
              placeholder={t('sessions:filter-input-mobile')}
              prefix={<SearchIcon />}
              onChange={handleInputChange}
            />
          </div>

          <div className="sessions__filter-buttons">
            <IconButton size="sm">
              <FilterIcon />
            </IconButton>
            <IconButton size="sm" className="sessions__filter-btn-calendar">
              <CalendarIcon />
            </IconButton>
          </div>
        </div>
      </Styles>
    )
  }

  return (
    <Styles>
      <div className="sessions__filter-col sessions__filter-col_form">
        <div className="sessions__filter-search">
          <Input
            id="sessions-search"
            placeholder={t('sessions:filter-input')}
            prefix={<SearchIcon />}
            onChange={handleInputChange}
          />
        </div>
        <div className="sessions__filter-select">
          <Select
            id="sessions-type"
            placeholder={t('sessions:type')}
            options={sessionTypeOptions}
            onChange={(e) => setType(e)}
          />
        </div>
        <div className="sessions__filter-select">
          <Select
            id="sessions-client"
            placeholder={t('sessions:filter-by-client')}
            options={[]}
          />
        </div>
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
