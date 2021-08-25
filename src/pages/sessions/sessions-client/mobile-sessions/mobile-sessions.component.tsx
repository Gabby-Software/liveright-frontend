import React, { useState } from 'react'

import { DocumentOutlinedIcon } from '../../../../assets/media/icons'
import { ReactComponent as CalendarIcon } from '../../../../assets/media/icons/calendar.svg'
import Button from '../../../../components/buttons/button/button.component'
import CreditsButton from '../../../../components/buttons/credits-button/credits-button.component'
import IconButton from '../../../../components/buttons/icon-button/icon-button.component'
import SessionAddModal from '../../../../components/sessions/session-add-modal/session-add-modal.component'
import SessionRescheduleModal from '../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component'
import userTypes from '../../../../enums/user-types.enum'
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
  const { sessions, getSessions, trainer } = props
  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [rescheduleSession, setRescheduleSession] = useState<SessionType>()
  const [addOpen, setAddOpen] = useState(false)
  const { t } = useTranslation()

  const renderItemOptions = (item: SessionType) => {
    return (
      <div className="sessions__options">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setRescheduleOpen(true)
            setRescheduleSession(item)
          }}
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
          <Button onClick={() => setAddOpen(true)}>
            {t('sessions:request')}
          </Button>
        }
        headerComponent={
          <HeaderComponent>
            <CreditsButton count={-3} className="sessions__credits-btn" />
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

      <SessionRescheduleModal
        open={rescheduleOpen}
        onClose={() => setRescheduleOpen(false)}
        session={rescheduleSession}
      />
      {trainer ? (
        <SessionAddModal
          trainer_id={
            trainer.accounts.find((it) => it.type === userTypes.TRAINER)!.id
          }
          isOpen={addOpen}
          onClose={() => setAddOpen(false)}
        />
      ) : null}
    </>
  )
}

export default MobileSessions
