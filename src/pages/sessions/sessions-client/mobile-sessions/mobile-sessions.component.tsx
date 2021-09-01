import React from 'react'

import { DocumentOutlinedIcon } from '../../../../assets/media/icons'
import { ReactComponent as CalendarIcon } from '../../../../assets/media/icons/calendar.svg'
import Button from '../../../../components/buttons/button/button.component'
import CreditsButton from '../../../../components/buttons/credits-button/credits-button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import useCreditsWithTrainer from '../../../../hooks/api/credits/useCreditsWithTrainer'
import MobilePage from '../../../../layouts/mobile-page/mobile-page.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionsState } from '../../../../store/reducers/sessions.reducer'
import { AccountObjType } from '../../../../types/account.type'
import { SessionType } from '../../../../types/session.type'
import { SessionFilter, SessionStatus } from '../../../../types/session.type'
import SessionsCards from '../../components/sessions-mobile-cards/sessions-mobile-cards.component'
import { HeaderComponent, Styles } from './mobile-sessions.styles'

interface Props {
  sessions: SessionsState
  trainer: AccountObjType
  getSessions: (
    status: SessionStatus
  ) => (page: number, filters?: SessionFilter) => void
}

const MobileSessions: React.FC<Props> = (props) => {
  const { sessions, getSessions } = props
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

        <IconButton size="sm" className="sessions__doc-btn">
          <DocumentOutlinedIcon />
        </IconButton>
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
              getSessions={getSessions('upcoming')}
              sessions={sessions.upcoming}
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
            getSessions={getSessions('past')}
            sessions={sessions.upcoming}
          />
        </Styles>
      </MobilePage>
    </>
  )
}

export default MobileSessions
