import React, { useEffect, useState } from 'react'

import { CalendarIcon, SearchIcon } from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import { FormInputLabeledUI } from '../../../../components/forms/form-input-labeled/form-input-labeled.component'
import { FormSelectUI } from '../../../../components/forms/form-select/form-select.component'
import { sessionTypeOptions } from '../../../../enums/session-filters.enum'
import { useIsMobile } from '../../../../hooks/is-mobile.hook'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { Session, SessionFilter } from '../../../../types/session.type'
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
    const result: Pick<SessionFilter, 'type' | 'date'> = {}

    if (type !== 'All') {
      result.type = type
    }

    if (date.trim()) {
      const isDate = /^\d{4}-\d{2}-\d{2}$/.test(date)

      if (isDate) {
        result.date = date
      } else if (type === 'All' && (date as Session)) {
        result.type = date
      }
    }

    onUpdate(result)
  }

  const handleInputBlur = () => {
    handleUpdateFilters()
  }

  useEffect(() => {
    handleUpdateFilters()
  }, [type])

  return (
    <Styles row={!isMobile}>
      <div className="sessions__filter-col sessions__filter-col_form">
        <div className="sessions__filter-search">
          <Input
            id="sessions-search"
            placeholder={t('sessions:filter-input')}
            prefix={<SearchIcon />}
          />
        </div>
        <div className="sessions__filter-select">
          <Select
            id="sessions-type"
            placeholder={t('sessions:type')}
            options={[]}
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
          >
            <CalendarIcon />
            {t('sessions:open-calendar-link')}
          </Button>
        </div>
      )}
      {/*<FormInputLabeledUI*/}
      {/*  name="dateType"*/}
      {/*  placeholder="For example 2021-12-31"*/}
      {/*  label={t('sessions:filter-input')}*/}
      {/*  value={date}*/}
      {/*  onUpdate={setDate}*/}
      {/*  onBlur={handleInputBlur}*/}
      {/*/>*/}
      {/*<FormSelectUI*/}
      {/*  name="type"*/}
      {/*  value={type}*/}
      {/*  label={t('sessions:type')}*/}
      {/*  options={sessionTypeOptions}*/}
      {/*  onUpdate={setType}*/}
      {/*/>*/}
    </Styles>
  )
}

export default SessionsFilters
