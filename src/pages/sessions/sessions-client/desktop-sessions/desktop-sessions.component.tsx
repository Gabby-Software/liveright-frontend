import React, { useState } from 'react'
import ICalendarLink from 'react-icalendar-link'

import {
  DocumentOutlinedIcon,
  SearchIcon
} from '../../../../assets/media/icons'
import { ReactComponent as CalendarIcon } from '../../../../assets/media/icons/calendar.svg'
import Button from '../../../../components/buttons/button/button.component'
import CreditsButton from '../../../../components/buttons/credits-button/credits-button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import Input from '../../../../components/form/input/input.component'
import Select from '../../../../components/form/select/select.component'
import SessionAddModal from '../../../../components/sessions/session-add-modal/session-add-modal.component'
import SessionRescheduleModal from '../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component'
import PageSubtitle from '../../../../components/titles/page-subtitle.styles'
import PageTitle from '../../../../components/titles/page-title.styles'
import { sessionTypeOptions } from '../../../../enums/session-filters.enum'
import userTypes from '../../../../enums/user-types.enum'
import useTrainerAccount from '../../../../hooks/api/accounts/useTrainerAccount'
import useCreditsWithTrainer from '../../../../hooks/api/credits/useCreditsWithTrainer'
import { UseSession } from '../../../../hooks/api/sessions/useSession'
import { UseSessions } from '../../../../hooks/api/sessions/useSessions'
import { useDesktopLayoutConfig } from '../../../../layouts/desktop-layout/desktop-layout.config'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../types/session.type'
import SessionsTable from '../../components/sessions-table/sessions-table.component'
import { getCalenderEvent } from '../../sessions.utils'
import Styles from './desktop-sessions.styles'

interface DesktopSessionsProps {
  upcomingSessions: UseSessions & UseSession
  pastSessions: UseSessions & UseSession
}

export default function DesktopSessions({
  upcomingSessions,
  pastSessions
}: DesktopSessionsProps) {
  const { t } = useTranslation()

  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [rescheduleSession, setRescheduleSession] = useState<SessionType>()
  const [addOpen, setAddOpen] = useState(false)

  const { credits, isLoading } = useCreditsWithTrainer()

  const { user: trainer } = useTrainerAccount()

  useDesktopLayoutConfig({
    className: 'sessions__layout'
  })

  const renderItemOptions = (item: SessionType) => {
    return (
      <div className="sessions__options">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setRescheduleOpen(true)
            setRescheduleSession(item)
          }}
        >
          {t('sessions:reschedule')}
        </Button>
        <ICalendarLink event={getCalenderEvent(item, 'client')}>
          <IconButton
            size="sm"
            tooltip="Calendar"
            className="sessions__row-doc-btn"
          >
            <DocumentOutlinedIcon />
          </IconButton>
        </ICalendarLink>
      </div>
    )
  }

  return (
    <Styles>
      <div className="sessions">
        <div className="sessions__main">
          <PageTitle className="sessions__title">
            {t('sessions:title')}

            <div className="sessions__title-btn">
              <CreditsButton
                loading={isLoading}
                count={credits}
                className="sessions__title-credits"
              />
              <Button onClick={() => setAddOpen(true)}>
                {t('sessions:session-request')}
              </Button>
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
            sessions={upcomingSessions.sessions}
            meta={upcomingSessions.meta}
            renderOptions={renderItemOptions}
            onPage={upcomingSessions.onPage}
            onFilters={upcomingSessions.onFilters}
            onSearch={upcomingSessions.onSearch}
            filters={upcomingSessions.filters}
            loading={upcomingSessions.isLoading}
          />

          <PageSubtitle className="sessions__subtitle sessions__subtitle_past">
            {t('sessions:past-title')}

            <div className="sessions__filters-form">
              <div className="sessions__filters-type">
                <Select
                  id="sessions-type"
                  placeholder={t('sessions:type')}
                  options={sessionTypeOptions}
                  onChange={(e) =>
                    pastSessions.onFilters('type', e === 'All' ? null : e)
                  }
                />
              </div>

              <div className="sessions__filters-search">
                <Input
                  id="sessions-search"
                  placeholder={t('sessions:filter-input')}
                  prefix={<SearchIcon />}
                  onChange={(e) => pastSessions.onSearch(e.target.value)}
                />
              </div>
            </div>
          </PageSubtitle>

          <SessionsTable
            sessions={pastSessions.sessions}
            meta={pastSessions.meta}
            onFilters={pastSessions.onFilters}
            onSearch={pastSessions.onSearch}
            onPage={pastSessions.onPage}
            filters={pastSessions.filters}
            loading={pastSessions.isLoading}
          />
        </div>

        <SessionRescheduleModal
          open={rescheduleOpen}
          session={rescheduleSession}
          onClose={() => setRescheduleOpen(false)}
          mutate={upcomingSessions.mutate}
        />
        {trainer ? (
          <SessionAddModal
            trainer_id={
              trainer.accounts?.find((it) => it.type === userTypes.TRAINER)!.id
            }
            isOpen={addOpen}
            onClose={() => setAddOpen(false)}
            mutate={upcomingSessions.mutate}
          />
        ) : null}
      </div>
    </Styles>
  )
}
