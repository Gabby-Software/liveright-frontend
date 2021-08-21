import React, { useState } from 'react'

import {
  DocumentOutlinedIcon,
  OptionSolidIcon,
  SearchIcon
} from '../../../../assets/media/icons'
import { ReactComponent as CalendarIcon } from '../../../../assets/media/icons/calendar.svg'
import Button from '../../../../components/buttons/button/button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import SessionAddModal from '../../../../components/sessions/session-add-modal/session-add-modal.component'
import SessionRescheduleModal from '../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component'
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import PageTitle from '../../../../components/titles/page-title.styles'
import { sessionTypeOptions } from '../../../../enums/session-filters.enum'
import userTypes from '../../../../enums/user-types.enum'
import { useDesktopLayoutConfig } from '../../../../layouts/desktop-layout/desktop-layout.config'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionsState } from '../../../../store/reducers/sessions.reducer'
import { AccountObjType } from '../../../../types/account.type'
import { SessionType } from '../../../../types/session.type'
import { SessionFilter, SessionStatus } from '../../../../types/session.type'
import SessionsTable from '../../components/sessions-table/sessions-table.component'
import Styles from './desktop-sessions.styles'

interface Props {
  sessions: SessionsState
  trainer: AccountObjType
  getSessions: (
    status: SessionStatus
  ) => (page: number, filters?: SessionFilter) => void
}

const DesktopSessions: React.FC<Props> = (props) => {
  const { getSessions, sessions, trainer } = props
  const { t } = useTranslation()
  const [rescheduleOpen, setRescheduleOpen] = useState<SessionType>()
  const [addOpen, setAddOpen] = useState<boolean>(false)

  useDesktopLayoutConfig({
    className: 'sessions__layout'
  })

  const renderItemOptions = (item: SessionType) => {
    return (
      <div className="sessions__options">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setRescheduleOpen(item)}
        >
          {t('sessions:reschedule')}
        </Button>
        <IconButton
          size="sm"
          tooltip="Calendar"
          className="sessions__row-doc-btn"
        >
          <DocumentOutlinedIcon />
        </IconButton>
        <IconButton
          size="sm"
          tooltip="Options"
          className="sessions__row-options-btn"
        >
          <OptionSolidIcon />
        </IconButton>
      </div>
    )
  }

  return (
    <Styles>
      <div className="sessions">
        <div className="sessions__main">
          <PageTitle className="sessions__title">
            {t('sessions:title')}

            <div>
              <Button>{t('sessions:session-request')}</Button>
            </div>
          </PageTitle>

          <PageSubtitle className="sessions__subtitle">
            {t('sessions:upcoming-title')}

            <Button variant="text" size="sm" className="sessions__calendar-btn">
              <CalendarIcon />
              {t('sessions:open-calendar-link')}
            </Button>
          </PageSubtitle>

          <SessionsTable
            sessions={sessions.upcoming}
            getSessions={getSessions('upcoming')}
            renderOptions={renderItemOptions}
          />

          <PageSubtitle className="sessions__subtitle sessions__subtitle_past">
            {t('sessions:past-title')}

            <div className="sessions__filters-form">
              <div className="sessions__filters-type">
                <Select
                  id="sessions-type"
                  placeholder={t('sessions:type')}
                  options={sessionTypeOptions}
                  // onChange={(e) => setType(e)}
                />
              </div>

              <div className="sessions__filters-search">
                <Input
                  id="sessions-search"
                  placeholder={t('sessions:filter-input')}
                  prefix={<SearchIcon />}
                  // onChange={handleInputChange}
                />
              </div>
            </div>
          </PageSubtitle>

          <SessionsTable
            sessions={sessions.past}
            getSessions={getSessions('past')}
          />
        </div>
        {rescheduleOpen ? (
          <SessionRescheduleModal
            session={rescheduleOpen}
            onClose={() => setRescheduleOpen(undefined)}
          />
        ) : null}
        {trainer ? (
          <SessionAddModal
            trainer_id={
              trainer.accounts.find((it) => it.type === userTypes.TRAINER)!.id
            }
            isOpen={addOpen}
            onClose={() => setAddOpen(false)}
          />
        ) : null}
      </div>
    </Styles>
  )
}

export default DesktopSessions
