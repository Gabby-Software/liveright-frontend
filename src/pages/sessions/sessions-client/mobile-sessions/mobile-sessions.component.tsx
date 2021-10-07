import React from 'react'
import ICalendarLink from 'react-icalendar-link'

import {
  CalendarIcon,
  DocumentOutlinedIcon
} from '../../../../assets/media/icons'
import Button from '../../../../components/buttons/button/button.component'
import CreditsButton from '../../../../components/buttons/credits-button/credits-button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import useCreditsWithTrainer from '../../../../hooks/api/credits/useCreditsWithTrainer'
import { UseSession } from '../../../../hooks/api/sessions/useSession'
import { UseSessions } from '../../../../hooks/api/sessions/useSessions'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionType } from '../../../../types/session.type'
import SessionsCards from '../../components/sessions-mobile-cards/sessions-mobile-cards.component'
import { getCalenderEvent } from '../../sessions.utils'
import { HeaderComponent, Styles } from './mobile-sessions.styles'

interface MobileSessionsProps {
  upcomingSessions: UseSessions & UseSession
  pastSessions: UseSessions & UseSession
}

export default function MobileSessions({
  upcomingSessions,
  pastSessions
}: MobileSessionsProps) {
  const { t } = useTranslation()
  const { credits, isLoading } = useCreditsWithTrainer()

  const renderItemOptions = (item: SessionType) => {
    return (
      <div className="sessions__options">
        <Button
          variant="secondary"
          size="sm"
          to={`/sessions/reschedule?session=${JSON.stringify(item)}`}
        >
          {t('sessions:reschedule')}
        </Button>

        <ICalendarLink event={getCalenderEvent(item, 'client')}>
          <IconButton size="sm" className="sessions__doc-btn">
            <DocumentOutlinedIcon />
          </IconButton>
        </ICalendarLink>
      </div>
    )
  }

  return (
    <>
      <MobilePage
        title={t('sessions:title')}
        actionComponent={
          <Button to="/sessions/request">{t('sessions:request')}</Button>
        }
        headerComponent={
          <HeaderComponent>
            <CreditsButton
              count={credits}
              loading={isLoading}
              className="sessions__credits-btn"
            />
          </HeaderComponent>
        }
      >
        <Styles>
          <div className="sessions__upcoming-container">
            <SessionsCards
              renderOptions={renderItemOptions}
              title={t('sessions:upcoming-title')}
              sessions={upcomingSessions.sessions}
              meta={upcomingSessions.meta}
              onPage={upcomingSessions.onPage}
              onFilters={upcomingSessions.onFilters}
              onSearch={upcomingSessions.onSearch}
              filters={upcomingSessions.filters}
              isLoading={upcomingSessions.isLoading}
              titleComponent={
                <div className="sessions__cards-title-btn-container">
                  <IconButton
                    size="sm"
                    className="sessions__cards-title-calendar-btn"
                  >
                    <CalendarIcon />
                  </IconButton>
                </div>
              }
            />
          </div>

          <div className="sessions__divider" />

          <SessionsCards
            withFilter
            title={t('sessions:past-title')}
            sessions={pastSessions.sessions}
            meta={pastSessions.meta}
            onPage={pastSessions.onPage}
            filters={pastSessions.filters}
            onFilters={pastSessions.onFilters}
            onSearch={pastSessions.onSearch}
            isLoading={pastSessions.isLoading}
          />
        </Styles>
      </MobilePage>
    </>
  )
}
