/* eslint-disable no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function */
import React, { useState } from 'react'

import { ReactComponent as AddIcon } from '../../../../assets/media/icons/add.svg'
import { ReactComponent as CalendarIcon } from '../../../../assets/media/icons/calendar.svg'
import ActionIcon from '../../../../components/action-icon/action-icon.component'
import FormButton from '../../../../components/forms/form-button/form-button.component'
import SessionAddModal from '../../../../components/sessions/session-add-modal/session-add-modal.component'
import SessionRescheduleModal from '../../../../components/sessions/session-reschedule-modal/session-reschedule-modal.component'
import userTypes from '../../../../enums/user-types.enum'
import { useMobileTitleContent } from '../../../../layouts/mobile-layout/mobile-layout.component'
import { useTranslation } from '../../../../modules/i18n/i18n.hook'
import { SessionsState } from '../../../../store/reducers/sessions.reducer'
import { AccountObjType } from '../../../../types/account.type'
import { SessionType } from '../../../../types/session.type'
import { SessionFilter, SessionStatus } from '../../../../types/session.type'
import SessionsCards from '../../components/sessions-mobile-cards/sessions-mobile-cards.component'
import { TitleContent } from '../../sessions-trainer/mobile-sessions/mobile-sessions.styles'
import Styles from './mobile-sessions.styles'

interface Props {
  sessions: SessionsState
  trainer: AccountObjType
  getSessions: (
    status: SessionStatus
  ) => (page: number, filters?: SessionFilter) => void
}

const MobileSessions: React.FC<Props> = (props) => {
  const { sessions, getSessions, trainer } = props
  const [rescheduleOpen, setRescheduleOpen] = useState<SessionType>()
  const [addOpen, setAddOpen] = useState(false)
  const { t } = useTranslation()
  const credits = -2 // temp

  const renderItemOptions = (item: SessionType) => {
    return (
      <div className="sessions__options">
        <FormButton onClick={() => setRescheduleOpen(item)}>
          {t('sessions:reschedule')}
        </FormButton>
        <ActionIcon icon={CalendarIcon} title="Calendar" onClick={() => {}} />
      </div>
    )
  }

  useMobileTitleContent(
    <TitleContent>
      <ActionIcon
        icon={AddIcon}
        title={t('sessions:schedule-new')}
        onClick={() => setAddOpen(true)}
      />
    </TitleContent>
  )

  return (
    <Styles credits={credits}>
      <div className="sessions__credits">
        <div>
          <span>{t('sessions:current-credits')}</span>
          <span>{credits}</span>
        </div>
        {/*{credits < 0 ? <FormButton type="primary">{t('invoices:pay')}</FormButton> : null}*/}
      </div>
      <SessionsCards
        renderOptions={renderItemOptions}
        title={t('sessions:upcoming-title')}
        getSessions={getSessions('upcoming')}
        sessions={sessions.upcoming}
      />
      <SessionsCards
        withFilter
        title={t('sessions:past-title')}
        getSessions={getSessions('past')}
        sessions={sessions.upcoming}
      />
      {rescheduleOpen ? (
        <SessionRescheduleModal
          onClose={() => setRescheduleOpen(undefined)}
          session={rescheduleOpen}
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
    </Styles>
  )
}

export default MobileSessions
